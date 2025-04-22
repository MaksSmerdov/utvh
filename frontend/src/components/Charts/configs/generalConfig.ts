import { ChartOptions } from 'chart.js';
import { BackgroundZone } from '../types/configChart.ts';

export const colors: string[] = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(255, 205, 86, 1)',
  'rgba(201, 203, 207, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 99, 71, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(0, 255, 255, 1)',
  'rgba(255, 20, 147, 1)',
  'rgba(139, 69, 19, 1)',
  'rgba(128, 0, 128, 1)',
  'rgba(0, 0, 255, 1)',
];

export const getBaseChartOptions = (
  startTime: number,
  endTime: number,
  title: string,
  isAutoScroll: boolean,
  params: { key: string; label: string; unit?: string }[],
  yMin?: number,
  yMax?: number,
  backgroundZones?: BackgroundZone[] // Новый параметр
): Partial<ChartOptions<'line'>> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: title,
      font: { size: 20, weight: 'bold' },
      color: 'green',
    },
    tooltip: {
      enabled: true,
      callbacks: {
        title: (tooltipItems) => {
          if (tooltipItems.length > 0) {
            const parsedTime = tooltipItems[0].parsed.x;
            const date = new Date(parsedTime);
            return date.toLocaleString('ru-RU');
          }
          return '';
        },
        label: (context) => {
          const label = context.dataset.label || '';
          // Извлекаем значение y, если это объект
          const rawValue = context.raw;
          const value =
            rawValue && typeof rawValue === 'object' && 'y' in rawValue ? rawValue.y : rawValue;
          const unit = params[context.datasetIndex]?.unit || '';
          return `${label}: ${value !== null ? value + ' ' + unit : 'Нет данных'}`;
        },
      },
    },

    backgroundZonesPlugin: {
      zones: backgroundZones || [],
    },
    crosshair: {
      line: { color: 'black', width: 1 },
      sync: { enabled: false },
      zoom: { enabled: false },
      snap: { enabled: true },
    },
  },
  scales: {
    x: {
      type: 'time',
      min: startTime,
      max: isAutoScroll ? endTime + 30 * 1000 : endTime,
      ticks: { autoSkip: false },
    },
    y: {
      beginAtZero: yMin === undefined,
      min: yMin ?? undefined,
      max: yMax ?? undefined,
    },
  },
});
