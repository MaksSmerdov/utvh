import { globalUnits } from './unitsMap';
import { SensorData } from '../types/interface.ts';


export function withUnits(
  data: SensorData,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(data).map(([name, value]) => {
      const num = Number(value);
      const unit = globalUnits[name];
      const displayName = unit ? `${name}, ${unit}` : name;
      return [displayName, num] as [string, number];
    }),
  );
}
