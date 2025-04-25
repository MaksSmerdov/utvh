import React from 'react';
import GifComponent, { GifComponentProps } from '../../../../../components/GifComponent/GifComponent.tsx';
import styles from './styles/GifDisplayHvoFirst.module.scss';
import { HvoFirstData } from '../../../../../types/hvoData.ts';

interface GifDisplayProps {
  data: HvoFirstData;
}

const GifDisplayHvoFirst: React.FC<GifDisplayProps> = ({ data }) => {
  const gifConfigs: GifComponentProps[] = [
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-1-1']}`,
      value: data.frequency?.['Рабочая частота насоса H1/1'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-1-2']}`,
      value: data.frequency?.['Рабочая частота насоса H1/2'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-2-1']}`,
      value: data.frequency?.['Рабочая частота насоса H2/1'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-2-2']}`,
      value: data.frequency?.['Рабочая частота насоса H2/2'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
  ];

  return (
    <>
      {gifConfigs.map(({ ...props }) => (
        <GifComponent key={props.className} {...props} />
      ))}
    </>
  );
};

export default GifDisplayHvoFirst;
