import { BooleanSensorData, SensorData } from './interface.ts';

export interface BoilerData {
  _id: string;
  parameters: SensorData;
  info: BooleanSensorData;
  alarms: BooleanSensorData;
  im: SensorData;
  others: BooleanSensorData;
}