import { Config, ConfigParam } from '../../../components/Charts/types/configChart.ts';

export const boilerConfigs: Config[] = [
  { id: '1', showIntervalSelector: true },
  { id: '2', showIntervalSelector: false },
  { id: '3', showIntervalSelector: false },
];

export const levelParams: ConfigParam[] = [
  { keyPrefix: 'В топке', label: 'В топке' },
  { keyPrefix: 'ИМ уровня', label: 'ИМ уровня' },
];

