import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { API_BASE_URL } from '../../apiConfig';
import { useFetchChart } from './components/Hooks/useFetchChart.ts';
import { ChartProps } from './types/configChart.ts';
import CustomDatePicker from './components/CustomDatePicker/CustomDatePicker.tsx';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage.tsx';
import Loader from '../../ui/Loader/Loader';
import styles from './Chart.module.scss';
import ControlChartButtons from './components/ControlChartButtons/ControlChartButtons.tsx';
import { extractValues, fetchServerTime } from './utils/generalUtils.ts';
import { getDailyChartOptions } from './configs/dailyChartConfig.ts';
import { computeTimeRange, prepareChartData } from './utils/dailyChartUtils.ts';
import { chartAreaBorder } from './plugins/chartPlugins.ts';
import { backgroundZonesPlugin } from './plugins/chartPlugins.ts';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  TimeScale,
  CrosshairPlugin,
  chartAreaBorder,
  backgroundZonesPlugin,
);

const DailyChart: React.FC<ChartProps> = ({
                                            datasets,
                                            title,
                                            yMin,
                                            yMax,
                                            width = '100%',
                                            height = '500px',
                                            id,
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
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [timeRange, setTimeRange] = useState(() =>
    computeTimeRange(selectedDate, () => new Date(Date.now() + timeDifference)),
  );
  const { startTime, endTime } = timeRange;

  const {
    data,
    error,
    isLoading: isDataLoading,
  } = useFetchChart(adjustedDatasets, startTime, endTime, 60000);
  const [isLoading, setIsLoading] = useState(true);
  const [allHidden, setAllHidden] = useState(false);

  useEffect(() => {
    fetchServerTime().then((difference) => {
      setTimeDifference(difference);
    });
  }, []);

  const getAdjustedTime = useCallback(
    (): Date => new Date(Date.now() + timeDifference),
    [timeDifference],
  );

  // Обновляем диапазон времени, если не выбрана дата
  useEffect(() => {
    if (!selectedDate) {
      setTimeRange(computeTimeRange(null, getAdjustedTime));
    }
  }, [timeDifference, getAdjustedTime, selectedDate]);

  // Обработчик выбора даты
  const handleDateChange = useCallback(
    (date: Dayjs | null) => {
      setIsLoading(true);
      setSelectedDate(date);
      setTimeRange(computeTimeRange(date, getAdjustedTime));
    },
    [getAdjustedTime],
  );

  // Возврат к текущим данным
  const handleReturnToCurrent = useCallback(() => {
    setIsLoading(true);
    setSelectedDate(null);
    setTimeRange(computeTimeRange(null, getAdjustedTime));
  }, [getAdjustedTime]);

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
    return prepareChartData(processedData, startTime, endTime);
  }, [processedData, startTime, endTime]);

  const handleToggleAll = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets.forEach((_, index) => {
        const meta = chartRef.current?.getDatasetMeta(index);
        if (meta) {
          meta.hidden = !allHidden;
        }
      });
      chartRef.current.update('none');
      setAllHidden(!allHidden);
    }
  }, [allHidden]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!isDataLoading && data?.length > 0) {
      setIsLoading(false);
    }
  }, [isDataLoading, data, error]);

  const chartTitle = useMemo(
    () => (selectedDate ? `${title} - ${selectedDate.format('DD.MM.YYYY')}` : title),
    [selectedDate, title],
  );

  const options = useMemo(
    () =>
      getDailyChartOptions(
        startTime.getTime(),
        endTime.getTime(),
        chartTitle,
        false,
        adjustedDatasets.flatMap((d) => d.params),
        yMin,
        yMax,
        backgroundZones,
      ),
    [startTime, endTime, chartTitle, adjustedDatasets, yMin, yMax, backgroundZones],
  );

  // Логика неактивности (события на уровне документа)
  const inactivityTimerRef = useRef<number | null>(null);
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = window.setTimeout(() => {
      if (selectedDate) {
        handleReturnToCurrent();
      }
    }, 60000);
  }, [handleReturnToCurrent, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const events = ['mousemove', 'mousedown', 'touchstart', 'keydown'];
      events.forEach((event) => {
        document.addEventListener(event, resetInactivityTimer);
      });
      resetInactivityTimer();
      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, resetInactivityTimer);
        });
        if (inactivityTimerRef.current !== null) {
          clearTimeout(inactivityTimerRef.current);
        }
      };
    }
  }, [selectedDate, resetInactivityTimer]);

  // Автообновление времени, если не выбрана дата
  useEffect(() => {
    if (!selectedDate) {
      const intervalId = setInterval(() => {
        setTimeRange(computeTimeRange(null, getAdjustedTime));
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [selectedDate, getAdjustedTime]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className={styles['chart-container']}>
      <div className={styles['dynamic-graph__calendar']}>
        <span className={styles['dynamic-graph__calendar--span']}>Выберите дату для просмотра архива:</span>
        <CustomDatePicker label="Дата" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div id={id} ref={chartContainerRef} style={{ width, height }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
      <ControlChartButtons
        onToggleAll={handleToggleAll}
        onReturnToCurrent={handleReturnToCurrent}
        allHidden={allHidden}
      />
    </div>
  );
};

export default DailyChart;
