import React from 'react';
import HourlyChart from '../../../components/Charts/HourlyChart';
import { IntervalProvider } from '../../../components/Charts/components/Context/IntervalContext.tsx';
import { Dataset } from '../../../components/Charts/types/configChart.ts';
import { boilerConfigs } from './configBoiler.ts';

const createDatasets = (url: string): Dataset[] => {
  const gazDatasets = {
    apiUrl: url,
    dataKey: `parameters`,
    params: [
      {
        key: `Давление газа перед горелкой`,
        label: 'Давление газа',
        unit: 'кг/м²',
      },
    ],
  };
  return [gazDatasets];
};

const GazBoiler: React.FC = () => {
  return (
    <IntervalProvider>
      {boilerConfigs.map(({ id, showIntervalSelector }) => {
        const url = `api/kotel${id}/data`;
        const title = `Котел №${id}: Давление газа`;
        return (
          <HourlyChart
            key={`Gaz ${id}`}
            id={`Boiler Gaz №${id}`}
            title={title}
            yMin={0}
            yMax={4000}
            datasets={createDatasets(url)}
            showIntervalSelector={showIntervalSelector}
          />
        );
      })}
    </IntervalProvider>
  );
};

export default GazBoiler;
