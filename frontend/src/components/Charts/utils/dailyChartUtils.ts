import { Dayjs } from 'dayjs';
import { colors } from '../configs/generalConfig.ts';
import { createDataWithGaps } from './generalUtils.ts';

export const computeTimeRange = (
  selectedDate: Dayjs | null,
  getAdjustedTime: () => Date,
  dayDurationMs: number = 24 * 60 * 60 * 1000
): { startTime: Date; endTime: Date } => {
  if (selectedDate) {
    const jsDate = selectedDate.toDate();
    jsDate.setHours(0, 0, 0, 0);
    const startTime = new Date(jsDate);
    const endTime = new Date(jsDate.getTime() + dayDurationMs);
    return { startTime, endTime };
  } else {
    const endTime = new Date(getAdjustedTime().getTime());
    const startTime = new Date(endTime.getTime() - dayDurationMs);
    return { startTime, endTime };
  }
};

export const prepareChartData = (
  processedData: any[],
  startTime: Date,
  endTime: Date,
  gapThreshold: number = 2 * 60 * 1000
) => {
  const labels =
    processedData[0]?.data.length > 0
      ? processedData[0].data.map((d: any) => d.time)
      : Array.from(
          { length: 24 },
          (_, i) =>
            new Date(startTime.getTime() + (i * (endTime.getTime() - startTime.getTime())) / 24)
        );

  const datasetsForChart = processedData.flatMap((dataset: any, datasetIndex: number) =>
    dataset.params.map((param: any, paramIndex: number) => ({
      label: param.label,
      data:
        dataset.data.length > 0
          ? createDataWithGaps(dataset.data, param.key, gapThreshold)
          : labels.map(() => null),
      borderColor: colors[(datasetIndex * dataset.params.length + paramIndex) % colors.length],
      backgroundColor: colors[(datasetIndex * dataset.params.length + paramIndex) % colors.length],
      borderWidth: 1,
      pointRadius: 0,
      spanGaps: false,
    }))
  );

  return { labels, datasets: datasetsForChart };
};
