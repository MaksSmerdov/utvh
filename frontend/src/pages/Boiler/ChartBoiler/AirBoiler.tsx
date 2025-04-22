import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';
import { boilerConfigs } from './configBoiler.ts';

const createDatasets = (url: string): Dataset[] => {
  const airBoiler = {
    apiUrl: url,
    dataKey: `parameters`,
    params: [
      {
        key: `Давление воздуха перед горелкой`,
        label: 'Давление воздуха',
        unit: 'кг/см²',
      },
    ],
  };
  return [airBoiler];
};

const AirBoiler: React.FC = () => {
  return (
    <IntervalProvider>
      {boilerConfigs.map(({ id, showIntervalSelector }) => {
        const url = `api/kotel${id}/data`;
        const title = `Котел №${id}: Давление воздуха`;
        return (
          <HourlyChart
            key={`Air ${id}`}
            id={`Boiler Air №${id}`}
            title={title}
            yMin={0}
            yMax={200}
            datasets={createDatasets(url)}
            showIntervalSelector={showIntervalSelector}
          />
        );
      })}
    </IntervalProvider>
  );
};

export default AirBoiler;
