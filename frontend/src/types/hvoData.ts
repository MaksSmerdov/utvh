import { SensorData } from './interface.ts';

export interface HvoFirstData {
  pressures: SensorData;
  flows: SensorData;
  levels: SensorData;
  frequency: SensorData;
  task: SensorData;
  others: SensorData;
}

export interface HvoSecondData {
  temperatures: SensorData;
  pressures: SensorData;
  flows: SensorData;
  levels: SensorData;
  frequency: SensorData;
  others: SensorData;
}