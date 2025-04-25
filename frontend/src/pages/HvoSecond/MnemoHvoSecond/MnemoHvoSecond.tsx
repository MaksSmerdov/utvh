import React, { useState } from 'react';
import { useFetchData } from '../../../hooks/useFetchData.ts';
import { HvoSecondData } from '../../../types/hvoData.ts';
import Loader from '../../../ui/Loader/Loader.tsx';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage.tsx';
import Header from '../../../components/Header/Header.tsx';
import styles from './MnemoHvoSecond.module.scss';
import StaticLabels from '../../../components/StaticLabels/StaticLabels.tsx';
import { labels } from './components/Labels/labels.ts';
import Button from '../../../ui/CustomButton/CustomButton.tsx';
import { FaBook, FaEye, FaEyeSlash } from 'react-icons/fa';
import ModalHvoSecond from './components/ModalHvoSecond/ModalHvoSecond.tsx';
import GifDisplayHvoSecond from './components/Display/GifDisplayHvoSecond.tsx';
import LevelIndicator from '../../../components/LevelIndicator/LevelIndicator.tsx';
import ParamDisplayHvoSecond from './components/Display/ParamDisplayHvoSecond.tsx';
import Valve from '../../../components/Valve/Valve.tsx';

const MnemoHvoSecond: React.FC = () => {
  const { loading, data } = useFetchData<HvoSecondData>(`hvo2-data`);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  if (loading) return <Loader />;
  if (!data) return <ErrorMessage />;

  return (
    <>
      <Header title="ХВО щит №2" />
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
        <img src="/img/hvo/hvo2.png" alt="ХВО2" className={styles['mnemo__img']} />
        <StaticLabels labels={labels} />
        <ParamDisplayHvoSecond data={data} tooltipsEnabled={tooltipsEnabled} />
        <GifDisplayHvoSecond data={data} />

        <div className={`${styles['mnemo__valve']}`}>
          <Valve
            size={{ width: 20, height: 14 }}
            orientation={'horizontal'}
            threshold={5}
            value={data.others?.['Контроль положения ИМ2']}
          />
        </div>

        <div className={`${styles['mnemo__level']} ${styles['e2-1-titan']}`}>
          <LevelIndicator
            value={data.levels?.['Уровень воды в E2/1 (Титан)']}
            range={{ min: 0, max: 6000 }}
            threshold={0}
          />
        </div>
        <div className={`${styles['mnemo__level']} ${styles['e2-1-mida']}`}>
          <LevelIndicator
            value={data.levels?.['Уровень воды в E2/1 (Мида)']}
            range={{ min: 0, max: 6000 }}
            threshold={0}
            color="blue"
          />
        </div>

      </div>
      <ModalHvoSecond open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default MnemoHvoSecond;
