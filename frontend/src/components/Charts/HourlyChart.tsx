import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { API_BASE_URL } from '../../apiConfig';
import { useInterval } from './components/Context/IntervalContext.tsx';
import { useFetchChart } from './components/Hooks/useFetchChart.ts';
import { ChartProps } from './types/configChart.ts';
import Loader from '../../ui/Loader/Loader';
import styles from './Chart.module.scss';
import ControlChartButtons from './components/ControlChartButtons/ControlChartButtons.tsx';
import { colors } from './configs/generalConfig.ts';
import { createDataWithGaps, extractValues, fetchServerTime } from './utils/generalUtils.ts';
import IntervalSelector from './components/IntervalSelector/IntervalSelector.tsx';
import { getHourlyChartOptions } from './configs/hourlyChartConfig.ts';
import { handleBackward, handleForward, handleReturnToCurrent } from './utils/hourlyChartUtils.ts';
import { backgroundZonesPlugin } from './plugins/chartPlugins.ts';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CrosshairPlugin,
  backgroundZonesPlugin,
);

const HourlyChart: React.FC<ChartProps> = ({
                                             datasets,
                                             title,
                                             yMin,
                                             yMax,
                                             width = '100%',
                                             height = '400px',
                                             id,
                                             showIntervalSelector = true,
                                             animationEnabled = false,
                                             backgroundZones,
                                           }) => {
  const adjustedDatasets = useMemo(
    () =>
      datasets.map((ds) => ({
        ...ds,
        apiUrl: ds.apiUrl.startsWith('http') ? ds.apiUrl : `${API_BASE_URL}${ds.apiUrl}`,
      })),
    [datasets],
  );

  const [timeDifference, setTimeDifference] = useState<number>(0);
  const chartRef = useRef<ChartJS<'line', { x: Date; y: number | null }[], unknown> | null>(null);
  const { interval } = useInterval();
  const [startTime, setStartTime] = useState(new Date(Date.now() - interval * 60 * 1000));
  const [endTime, setEndTime] = useState(new Date());
  const {
    data,
    error,
    refetch,
    isLoading: isDataLoading,
  } = useFetchChart(adjustedDatasets, startTime, endTime);
  const [allHidden, setAllHidden] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [timeOffset, setTimeOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServerTime().then((difference) => {
      setTimeDifference(difference);
    });
  }, []);

  const getAdjustedTime = useCallback((): Date => {
    return new Date(Date.now() + timeDifference);
  }, [timeDifference]);

  useEffect(() => {
    const newEndTime = new Date(getAdjustedTime().getTime() - timeOffset);
    const newStartTime = new Date(newEndTime.getTime() - interval * 60 * 1000);
    setEndTime(newEndTime);
    setStartTime(newStartTime);
  }, [interval, timeOffset, timeDifference, getAdjustedTime]);

  const processedData = useMemo(() => {
    return adjustedDatasets.map((dataset, index) => {
      const datasetData =
        data[index]?.map((item: any) => ({
          time: new Date(item.lastUpdated),
          values: extractValues(item, dataset.dataKey),
        })) || [];
      return {
        data: datasetData,
        params: dataset.params,
      };
    });
  }, [data, adjustedDatasets]);

  const chartData = useMemo(() => {
    const labels =
      processedData[0]?.data.length > 0
        ? processedData[0].data.map((d) => d.time)
        : Array.from(
          { length: 10 },
          (_, i) =>
            new Date(startTime.getTime() + (i * (endTime.getTime() - startTime.getTime())) / 10),
        );

    const datasetsForChart = processedData.flatMap((dataset, datasetIndex) =>
      dataset.params.map((param, paramIndex) => ({
        label: param.label,
        data:
          dataset.data.length > 0
            ? createDataWithGaps(dataset.data, param.key)
            : labels.map(() => null),
        borderColor: colors[(datasetIndex * dataset.params.length + paramIndex) % colors.length],
        backgroundColor:
          colors[(datasetIndex * dataset.params.length + paramIndex) % colors.length],
        spanGaps: false,
      })),
    );

    return { labels, datasets: datasetsForChart };
  }, [processedData, startTime, endTime]);

  const options = useMemo(
    () =>
      getHourlyChartOptions(
        startTime.getTime(),
        endTime.getTime(),
        title,
        isAutoScroll,
        adjustedDatasets.flatMap((d) => d.params),
        yMin,
        yMax,
        animationEnabled,
        backgroundZones,
      ),
    [
      startTime,
      endTime,
      title,
      isAutoScroll,
      adjustedDatasets,
      yMin,
      yMax,
      animationEnabled,
      backgroundZones,
    ],
  );

  const handleBackwardWithInteraction = useCallback(() => {
    setLastInteractionTime(Date.now());
    const newOffset = timeOffset + interval * 60 * 1000;
    setTimeOffset(newOffset);
    handleBackward(startTime, endTime, setStartTime, setEndTime, setIsAutoScroll, interval);
  }, [startTime, endTime, interval, timeOffset]);

  const handleForwardWithInteraction = useCallback(() => {
    setLastInteractionTime(Date.now());
    const newOffset = Math.max(0, timeOffset - interval * 60 * 1000);
    setTimeOffset(newOffset);
    handleForward(startTime, endTime, setStartTime, setEndTime, setIsAutoScroll, interval);
  }, [startTime, endTime, interval, timeOffset]);

  const handleReturnToCurrentWithInteraction = useCallback(() => {
    setLastInteractionTime(Date.now());
    setTimeOffset(0);
    handleReturnToCurrent(setStartTime, setEndTime, setIsAutoScroll, interval);
  }, [interval]);

  const handleToggleDataset = useCallback((index: number) => {
    if (chartRef.current) {
      const meta = chartRef.current.getDatasetMeta(index);
      meta.hidden = !meta.hidden;
      chartRef.current.update('none');
    }
  }, []);

  const handleToggleAll = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets.forEach((_, index) => {
        const meta = chartRef.current?.getDatasetMeta(index);
        if (meta) {
          meta.hidden = !allHidden;
        }
      });
      chartRef.current.update('none');
    }
    setAllHidden(!allHidden);
  }, [allHidden]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isAutoScroll) {
        const newEndTime = new Date(getAdjustedTime().getTime() - timeOffset);
        const newStartTime = new Date(newEndTime.getTime() - interval * 60 * 1000);
        setEndTime(newEndTime);
        setStartTime(newStartTime);
        void refetch();
      } else {
        void refetch();
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isAutoScroll, interval, refetch, timeOffset, timeDifference, getAdjustedTime]);

  useEffect(() => {
    const inactivityTimeout = 60 * 1000;
    const checkInactivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime > inactivityTimeout && !isAutoScroll) {
        handleReturnToCurrent(setStartTime, setEndTime, setIsAutoScroll, interval);
      }
    };

    const intervalId = setInterval(checkInactivity, 1000);

    return () => clearInterval(intervalId);
  }, [lastInteractionTime, isAutoScroll, interval, setStartTime, setEndTime, setIsAutoScroll]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!isDataLoading && data.length > 0) {
      setIsLoading(false);
    }
  }, [isDataLoading, data, error]);

  return (
    <div className={styles['chart-container']}>
      {showIntervalSelector && <IntervalSelector />}

      {isLoading ? (
        <div className={styles['loader-container']} style={{ width, height }}>
          <Loader />
        </div>
      ) : error ? (
        <div className={styles['error-message']} style={{ width, height }}>
          Ошибка при загрузке данных. Связь с сервером/оборудованием отсутствует.
        </div>
      ) : (
        <div id={id} style={{ width, height }}>
          <Line
            ref={chartRef}
            data={chartData}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                legend: {
                  ...options.plugins?.legend,
                  onClick: (_, legendItem) => {
                    if (legendItem.datasetIndex !== undefined) {
                      handleToggleDataset(legendItem.datasetIndex);
                    }
                  },
                },
              },
            }}
          />
        </div>
      )}
      <ControlChartButtons
        onBackward={handleBackwardWithInteraction}
        onForward={handleForwardWithInteraction}
        onToggleAll={handleToggleAll}
        onReturnToCurrent={handleReturnToCurrentWithInteraction}
        allHidden={allHidden}
      />
    </div>
  );
};

export default HourlyChart;
