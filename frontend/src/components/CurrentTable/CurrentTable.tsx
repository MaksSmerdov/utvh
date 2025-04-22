import React from 'react';
import { SensorData } from '../../types/interface';

interface CurrentTableProps {
  sensorData: SensorData;
  title: string;
  unit?: string;
}

const CurrentTable: React.FC<CurrentTableProps> = ({ sensorData = {}, title, unit }) => {
  return (
    <table className="table">
      <caption className="table__title">{title}</caption>
      <thead className="table__thead">
        <tr className="table__tr">
          <th className="table__th table__left">Наименования</th>
          <th className="table__th">{unit ? `Значения, ${unit}` : 'Значения'}</th>
        </tr>
      </thead>
      <tbody className="table__tbody">
        {Object.entries(sensorData).map(([key, value]) => {
          return (
            <tr key={key} className="table__tr">
              <td className="table__td table__left">{key}</td>
              <td className="table__td table__value">{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CurrentTable;
