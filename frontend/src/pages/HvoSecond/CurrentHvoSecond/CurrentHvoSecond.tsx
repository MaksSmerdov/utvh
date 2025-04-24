import React from 'react';
import { useFetchData } from '../../../hooks/useFetchData.ts';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage.tsx';
import Loader from '../../../ui/Loader/Loader.tsx';
import CurrentTable from '../../../components/CurrentTable/CurrentTable.tsx';
import Header from '../../../components/Header/Header.tsx';
import { HvoSecondData } from '../../../types/hvoData.ts';

const CurrentHvoSecond: React.FC = () => {
  const { loading, data } = useFetchData<HvoSecondData>(`hvo2-data`);

  if (loading) return <Loader />;
  if (!data) return <ErrorMessage />;

  return (
    <>
      <Header title={`ХВО щит №2`} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <CurrentTable sensorData={data.temperatures} title="Температуры" unit="°C" />
        <CurrentTable sensorData={data.pressures} title="Давления" unit="кгс/cм²" />
        <CurrentTable sensorData={data.flows} title="Расходы" unit="м³/ч" />
        <CurrentTable sensorData={data.levels} title="Уровни" unit="мм" />
        <CurrentTable sensorData={data.frequency} title="Частоты" unit="Гц" />
        <CurrentTable sensorData={data.others} title="Остальные параметры" />
      </div>
    </>
  );
};

export default CurrentHvoSecond;