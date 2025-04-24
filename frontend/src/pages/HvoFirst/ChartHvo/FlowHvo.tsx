import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';

const createDatasetsHvoFirst = (url: string): Dataset[] => {
  const levelDatasets = {
    apiUrl: url,
    dataKey: `flows`,
    params: [
      {
        key: `Расход воды на установку`,
        label: 'Расход воды на установку',
        unit: 'м³/ч',
      },
      {
        key: `Расход воды на промывку фильтров`,
        label: 'Расход воды на промывку фильтров',
        unit: 'м³/ч',
      },
    ],
  };
  return [levelDatasets];
};

const createDatasetsHvoSecond = (url: string): Dataset[] => {
  const levelDatasets = {
    apiUrl: url,
    dataKey: `flows`,
    params: [
      {
        key: 'Расход умягченной воды после Ф4/1,2,3',
        label: 'Расход умягченной воды',
        unit: 'м³/ч',
      },
      {
        key: `Расход воды в канализацию`,
        label: 'Расход воды в канализацию',
        unit: 'м³/ч',
      },
    ],
  };
  return [levelDatasets];
};


const FlowHvo: React.FC = () => {
  return (
    <IntervalProvider>
      <HourlyChart
        key={'Flow First'}
        id={'Flow Hvo First'}
        title={'ХВО №1: Расход'}
        yMin={0}
        yMax={200}
        datasets={createDatasetsHvoFirst('api/hvo1/data')}
        showIntervalSelector={true}
      />
      <HourlyChart
        key={'Flow Second'}
        id={'Flow Hvo Second'}
        title={'ХВО №2: Расход'}
        yMin={0}
        yMax={200}
        datasets={createDatasetsHvoSecond('api/hvo2/data')}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default FlowHvo;
