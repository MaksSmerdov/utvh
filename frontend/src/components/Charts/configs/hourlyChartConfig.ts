import { ChartOptions } from 'chart.js';
import { getBaseChartOptions } from './generalConfig.ts';
import { BackgroundZone } from '../types/configChart.ts';

export const getHourlyChartOptions = (
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
  animationEnabled: boolean = true,
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
    animation: animationEnabled ? {} : false,
    plugins: {
      ...baseOptions.plugins,
      chartAreaBorder: false,
      title: {
        ...baseOptions.plugins?.title,
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, index) => {
              const lastValue = dataset.data.reduce((prev, curr) => {
                const currValue = curr && typeof curr === 'object' && 'y' in curr ? curr.y : curr;
                return currValue !== null ? currValue : prev;
              }, null);
              const label = dataset.label || '';
              const unit = params[index]?.unit || '';
              return {
                text: `${lastValue !== null ? lastValue + ' ' + unit : 'Нет данных'} | ${label}`,
                fillStyle: dataset.borderColor as string,
                hidden: !chart.isDatasetVisible(index),
                datasetIndex: index,
              };
            });
          },
        },
      },
    },
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales?.x,
        time: {
          unit: 'minute',
          displayFormats: { minute: 'HH:mm' },
        },
        ticks: {
          source: 'auto',
          autoSkip: false,
          maxTicksLimit: 20,
          sampleSize: 10,
        },
        grid: { display: true },
      },
    },
    elements: {
      point: { radius: 2 },
    },
  } as ChartOptions<'line'>;
};
