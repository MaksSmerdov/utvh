import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../apiConfig.ts';

export const useFetchData = <T>(
  api: string,
): { loading: boolean; data: T | null; error: Error | null } => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}api/${api}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: T = await response.json();
      setData(result);
      setLoading(false);
    } catch (e: any) {
      console.error('Ошибка при загрузке данных:', e);
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10_000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { loading, data, error };
};
