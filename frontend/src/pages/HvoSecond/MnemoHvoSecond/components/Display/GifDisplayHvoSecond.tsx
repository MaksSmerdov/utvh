import React from 'react';
import GifComponent, { GifComponentProps } from '../../../../../components/GifComponent/GifComponent.tsx';
import styles from './styles/GifDisplayHvoSecond.module.scss';
import { HvoSecondData } from '../../../../../types/hvoData.ts';

interface GifDisplayProps {
  data: HvoSecondData;
}

const GifDisplayHvoSecond: React.FC<GifDisplayProps> = ({ data }) => {
  const gifConfigs: GifComponentProps[] = [
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-4-1']}`,
      value: data.frequency?.['Рабочая частота насоса H4/1'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-4-2']}`,
      value: data.frequency?.['Рабочая частота насоса H4/2'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-5-1']}`,
      value: data.frequency?.['Рабочая частота насоса H5/1'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-5-2']}`,
      value: data.frequency?.['Рабочая частота насоса H5/2'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-6-1']}`,
      value: data.frequency?.['Рабочая частота насоса H6/1'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-6-2']}`,
      value: data.frequency?.['Рабочая частота насоса H6/2'],
      conditionType: 'greaterThan',
      compareValue: Number(5),
      isAnimation: true,
    },
    {
      src: '/img/hvo/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-pump-6-3']}`,
      value: data.frequency?.['Рабочая частота насоса H6/3'],
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

export default GifDisplayHvoSecond;
