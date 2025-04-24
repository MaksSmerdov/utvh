import React from 'react';
import { useParams } from 'react-router-dom';
import { BoilerData } from '../../../types/boilerData.ts';
import { useFetchData } from '../../../hooks/useFetchData.ts';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage.tsx';
import Loader from '../../../ui/Loader/Loader.tsx';
import CurrentTable from '../../../components/CurrentTable/CurrentTable.tsx';
import Header from '../../../components/Header/Header.tsx';

const unitsMap: Record<string, string> = {
  'Уровень в барабане котла': 'мм',
  'Разрежение в топке котла': 'кгс/м2',
  'Давление воздуха перед горелкой': 'кгс/м2',
  'Давление газа перед горелкой': 'кгс/м2',
  'Давление пара на выходе': 'кгс/см2',
};

const CurrentBoiler: React.FC = () => {
  const { id } = useParams();
  const { loading, data } = useFetchData<BoilerData>(`kotel${id}-data`);

  if (loading) return <Loader />;
  if (!data) return <ErrorMessage />;

  const sensorDataWithUnits = Object.fromEntries(
    Object.entries(data.parameters).map(([name, value]) => {
      const unit = unitsMap[name] ? `, ${unitsMap[name]}` : '';
      const num = Number(value);
      const displayName = `${name}${unit}`;
      return [displayName, num] as [string, number];
    })
  );

  return (
    <>
      <Header title={`Котел №${id}`} />
      <CurrentTable title="Текущие параметры" sensorData={sensorDataWithUnits} />
    </>
  );
};

export default CurrentBoiler;
