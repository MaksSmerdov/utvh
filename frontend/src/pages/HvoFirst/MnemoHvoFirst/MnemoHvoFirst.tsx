import React, { useState } from 'react';
import { useFetchData } from '../../../hooks/useFetchData.ts';
import { HvoFirstData } from '../../../types/hvoData.ts';
import Loader from '../../../ui/Loader/Loader.tsx';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage.tsx';
import Header from '../../../components/Header/Header.tsx';
import styles from './MnemoHvoFirst.module.scss';
import { labels } from './components/Labels/labels.ts';
import ParamDisplayHvoFirst from './components/Display/ParamDisplayHvoFirst.tsx';
import Button from '../../../ui/CustomButton/CustomButton.tsx';
import { FaBook, FaEye, FaEyeSlash } from 'react-icons/fa';
import GifDisplayHvoFirst from './components/Display/GifDisplayHvoFirst.tsx';
import Valve from '../../../components/Valve/Valve.tsx';
import LevelIndicator from '../../../components/LevelIndicator/LevelIndicator.tsx';
import SymbolsDisplayHvoFirst from './components/Display/SymbolsDisplayHvoFirst.tsx';
import ModalHvoFirst from './components/ModalHvoFirst/ModalHvoFirst.tsx';
import StaticLabels from '../../../components/StaticLabels/StaticLabels.tsx';

const MnemoHvoFirst: React.FC = () => {
  const { loading, data } = useFetchData<HvoFirstData>(`hvo1-data`);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  if (loading) return <Loader />;
  if (!data) return <ErrorMessage />;

  return (
    <>
      <Header title="ХВО щит №1" />
      <div className={styles['mnemo']}>
        <div className={`${styles['mnemo__control']}`}>
          <Button
            onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
            isActive={tooltipsEnabled}
          >
            {tooltipsEnabled ? <FaEyeSlash /> : <FaEye />}
            {tooltipsEnabled ? 'Выкл. всплывающие подсказки' : 'Вкл. всплывающие подсказки'}
          </Button>
          <Button onClick={() => setOpenModal(true)}>
            <FaBook />
            Документация
          </Button>
        </div>
        <img src="/img/hvo/hvo1.png" alt="ХВО1" className={styles['mnemo__img']} />
        <div className={`${styles['mnemo__valve']}`}>
          <Valve
            size={{ width: 20, height: 14 }}
            threshold={5}
            value={data.others?.['Контроль положения ИМ1']}
          />
        </div>
        <GifDisplayHvoFirst data={data} />
        <StaticLabels labels={labels} />
        <ParamDisplayHvoFirst data={data} tooltipsEnabled={tooltipsEnabled} />

        <div className={`${styles['mnemo__level-1']}`}>
          <LevelIndicator
            value={data.levels?.['Уровень воды в емкости E1/1']}
            range={{ min: 0, max: 1600 }}
            threshold={0}
          />
        </div>

        <div className={`${styles['mnemo__level-2']}`}>
          <LevelIndicator
            value={data.levels?.['Уровень воды в емкости E1/2']}
            range={{ min: 0, max: 1600 }}
            threshold={0}
          />
        </div>
        <SymbolsDisplayHvoFirst />
      </div>
      <ModalHvoFirst open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default MnemoHvoFirst;
