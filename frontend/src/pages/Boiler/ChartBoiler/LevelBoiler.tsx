import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';
import { boilerConfigs } from './configBoiler.ts';

const createDatasets = (url: string): Dataset[] => {
  const levelDatasets = {
    apiUrl: url,
    dataKey: `parameters`,
    params: [
      {
        key: `Уровень в барабане котла`,
        label: 'Уровень в котле',
        unit: 'мм',
      },
    ],
  };
  const imDatasets = {
    apiUrl: url,
    dataKey: 'im',
    params: [
      {
        key: `ИМ уровня`,
        label: 'Процент открытия',
        unit: '%',
      },
    ],
  };
  return [levelDatasets, imDatasets];
};

const LevelBoiler: React.FC = () => {
  return (
    <IntervalProvider>
      {boilerConfigs.map(({ id, showIntervalSelector }) => {
        const url = `api/kotel${id}/data`;
        const title = `Котел №${id}: Уровень`;
        return (
          <HourlyChart
            key={`Level ${id}`}
            id={`Boiler Level №${id}`}
            title={title}
            yMin={-100}
            yMax={100}
            datasets={createDatasets(url)}
            showIntervalSelector={showIntervalSelector}
          />
        );
      })}
    </IntervalProvider>
  );
};

export default LevelBoiler;
