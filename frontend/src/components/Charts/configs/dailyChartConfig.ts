import { ChartOptions } from 'chart.js';
import { getBaseChartOptions } from './generalConfig.ts';
import { BackgroundZone } from '../types/configChart.ts';

export const getDailyChartOptions = (
  startTime: number,
  endTime: number,
  title: string,
  isAutoScroll: boolean,
  params: {
    key: string;
    label: string;
    unit?: string;
  }[],
  yMin?: number,
  yMax?: number,
  backgroundZones?: BackgroundZone[]
): ChartOptions<'line'> => {
  const baseOptions = getBaseChartOptions(
    startTime,
    endTime,
    title,
    isAutoScroll,
    params,
    yMin,
    yMax,
    backgroundZones
  );
  return {
    ...baseOptions,
    animation: false,
    plugins: {
      ...baseOptions.plugins,
      title: {
        ...baseOptions.plugins?.title,
        padding: { top: 0, bottom: 0 },
      },
      legend: { display: true, labels: { font: { size: 14 } } },
    },
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales?.x,
        time: {
          unit: 'hour',
          minUnit: 'hour',
          displayFormats: { hour: 'HH:mm' },
        },
      },
    },
  } as ChartOptions<'line'>;
};
