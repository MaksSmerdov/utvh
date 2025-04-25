import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';
import { boilerConfigs } from './configBoiler.ts';

const createDatasets = (url: string): Dataset[] => {
  const imDatasets = {
    apiUrl: url,
    dataKey: 'im',
    params: [
      {
        key: `ИМ уровня`,
        label: 'ИМ уровня',
        unit: '%',
      },
      {
        key: `ИМ разрежения`,
        label: 'ИМ разрежения',
        unit: '%',
      },
      {
        key: `ИМ воздуха`,
        label: 'ИМ воздуха',
        unit: '%',
      },
      {
        key: `ИМ газа`,
        label: 'ИМ газа',
        unit: '%',
      },

    ],
  };
  return [imDatasets];
};

const ImBoiler: React.FC = () => {
  return (
    <IntervalProvider>
      {boilerConfigs.map(({ id, showIntervalSelector }) => {
        const url = `api/kotel${id}/data`;
        const title = `Котел №${id}: Положение ИМ`;
        return (
          <HourlyChart
            key={`IM ${id}`}
            id={`Boiler IM №${id}`}
            title={title}
            yMin={0}
            yMax={100}
            datasets={createDatasets(url)}
            showIntervalSelector={showIntervalSelector}
          />
        );
      })}
    </IntervalProvider>
  );
};

export default ImBoiler;
