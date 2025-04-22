import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';

const createDatasetsHvoFirst = (url: string): Dataset[] => {
  const levelDatasets = {
    apiUrl: url,
    dataKey: `levels`,
    params: [
      {
        key: `Уровень воды в емкости E1/1`,
        label: 'Уровень воды в емкости E1/1',
        unit: 'мм',
      },
      {
        key: `Уровень воды в емкости E1/2`,
        label: 'Уровень воды в емкости E1/2',
        unit: 'мм',
      },
    ],
  };
  return [levelDatasets];
};

const createDatasetsHvoSecond = (url: string): Dataset[] => {
  const levelDatasets = {
    apiUrl: url,
    dataKey: `levels`,
    params: [
      {
        key: 'Уровень воды в E2/1 (Титан)',
        label: 'Уровень воды в E2/1 (Титан)',
        unit: 'мм',
      },
      {
        key: `Уровень воды в E2/1 (Мида)`,
        label: 'Уровень воды в E2/1 (Мида)',
        unit: 'мм',
      },
    ],
  };
  return [levelDatasets];
};


const LevelHvo: React.FC = () => {
  return (
    <IntervalProvider>
      <HourlyChart
        key={'Level First'}
        id={'Level Hvo First'}
        title={'ХВО №1: Уровень'}
        yMin={0}
        yMax={2000}
        datasets={createDatasetsHvoFirst('api/hvo1/data')}
        showIntervalSelector={true}
      />
      <HourlyChart
        key={'Level Second'}
        id={'Level Hvo Second'}
        title={'ХВО №2: Уровень'}
        yMin={0}
        yMax={6500}
        datasets={createDatasetsHvoSecond('api/hvo2/data')}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default LevelHvo;
