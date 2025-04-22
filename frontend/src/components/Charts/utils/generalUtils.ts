import { API_BASE_URL } from '../../../apiConfig.ts';

export const fetchServerTime = async (): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}api/server-time`);
    const data = await response.json();
    const serverTime = new Date(data.time).getTime();
    const clientTime = Date.now();
    return serverTime - clientTime;
  } catch (error) {
    console.error('Ошибка при получении времени сервера:', error);
    return 0;
  }
};

export const extractValues = (item: any, dataKey: string) => {
  const rawValues = item[dataKey];
  if (rawValues && typeof rawValues === 'object') {
    const keys = Object.keys(rawValues);
    if (
      keys.length > 0 &&
      rawValues[keys[0]] &&
      typeof rawValues[keys[0]] === 'object' &&
      'value' in rawValues[keys[0]]
    ) {
      return Object.fromEntries(keys.map((key) => [key, rawValues[key]?.value]));
    }
  }
  return rawValues || {};
};

export const createDataWithGaps = (
  data: { time: Date; values: { [key: string]: number } }[],
  key: string,
  gapThreshold: number = 60 * 1000 // по умолчанию 1 минута
): { x: Date; y: number | null }[] => {
  const result: { x: Date; y: number | null }[] = [];

  for (let i = 0; i < data.length; i++) {
    const currentValue = data[i].values[key] !== undefined ? data[i].values[key] : null;
    result.push({ x: data[i].time, y: currentValue });

    if (i < data.length - 1) {
      const currentTimestamp = data[i].time.getTime();
      const nextTimestamp = data[i + 1].time.getTime();
      if (nextTimestamp - currentTimestamp > gapThreshold) {
        // Вставляем дополнительную точку с y: null для явного разрыва линии
        result.push({
          x: new Date(currentTimestamp + gapThreshold),
          y: null,
        });
      }
    }
  }

  return result;
};
