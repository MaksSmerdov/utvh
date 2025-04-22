import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';
import { boilerConfigs } from './configBoiler.ts';

const createDatasets = (url: string): Dataset[] => {
  const vacuumDatasets = {
    apiUrl: url,
    dataKey: `parameters`,
    params: [
      {
        key: `Разрежение в топке котла`,
        label: 'Разрежение',
        unit: 'кг/м²',
      },
    ],
  };
  return [vacuumDatasets];
};

const VacuumBoiler: React.FC = () => {
  return (
    <IntervalProvider>
      {boilerConfigs.map(({ id, showIntervalSelector }) => {
        const url = `api/kotel${id}/data`;
        const title = `Котел №${id}: Разрежение`;
        return (
          <HourlyChart
            key={`Vacuum ${id}`}
            id={`Boiler Vacuum №${id}`}
            title={title}
            yMin={-13}
            yMax={13}
            datasets={createDatasets(url)}
            showIntervalSelector={showIntervalSelector}
          />
        );
      })}
    </IntervalProvider>
  );
};

export default VacuumBoiler;
