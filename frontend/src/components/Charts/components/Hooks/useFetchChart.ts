import { useCallback, useEffect, useState } from 'react';

export interface GenericReading {
  [key: string]: number;
}

export interface GenericData {
  lastUpdated: string;
  values: GenericReading;
}

export interface DatasetConfig {
  apiUrl: string;
  dataKey: string;
  params: { key: string; label: string; unit?: string }[];
}

export const useFetchChart = (
  configs: DatasetConfig[],
  startTime: Date,
  endTime: Date,
  refresh?: number
) => {
  const [data, setData] = useState<GenericData[][]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();
    setIsLoading(true);
    try {
      const results = await Promise.all(
        configs.map(async (config) => {
          const response = await fetch(
            `${config.apiUrl}?start=${startTime.toISOString()}&end=${endTime.toISOString()}`,
            {
              signal: abortController.signal,
            }
          );

          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }

          return response.json();
        })
      );

      setData(results);
      setError(null);
    } catch (err) {
      console.error('Ошибка при запросе данных:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
    return () => abortController.abort();
  }, [configs, startTime, endTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (error) {
        void fetchData();
      }
    }, refresh || 10000);

    return () => clearInterval(intervalId);
  }, [error, fetchData]);

  // Основной запрос данных
  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData, refresh };
};
