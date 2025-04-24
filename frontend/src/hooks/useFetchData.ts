import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../apiConfig.ts';

export const useFetchData = <T>(
  api: string,
): { loading: boolean; data: T | null; error: boolean } => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/${api}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setLoading(false);
      setError(true);
    }
  }, [api]);

  useEffect(() => {
    void fetchData();
    const intervalId = setInterval(() => {
      void fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { loading, data, error };
};
