import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';
import { boilerConfigs } from './configBoiler.ts';

const createDatasets = (url: string): Dataset[] => {
  const steamDatasets = {
    apiUrl: url,
    dataKey: `parameters`,
    params: [
      {
        key: `Давление пара на выходе`,
        label: 'Давление пара',
        unit: 'кг/см²',
      },
    ],
  };
  return [steamDatasets];
};

const SteamBoiler: React.FC = () => {
  return (
    <IntervalProvider>
      {boilerConfigs.map(({ id, showIntervalSelector }) => {
        const url = `api/kotel${id}/data`;
        const title = `Котел №${id}: Давление пара`;
        return (
          <HourlyChart
            key={`Steam ${id}`}
            id={`Boiler Steam №${id}`}
            title={title}
            yMin={0}
            yMax={10}
            datasets={createDatasets(url)}
            showIntervalSelector={showIntervalSelector}
          />
        );
      })}
    </IntervalProvider>
  );
};

export default SteamBoiler;
