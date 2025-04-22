import React from 'react';
import GifComponent, { GifComponentProps } from '../../../../../components/GifComponent/GifComponent.tsx';
import styles from './styles/GifDisplayBoiler.module.scss';
import { BoilerData } from '../../../../../types/boilerData.ts';

interface GifDisplayProps {
  data: BoilerData;
}

const GifDisplayBoiler: React.FC<GifDisplayProps> = ({ data }) => {
  const gifConfigs: GifComponentProps[] = [
    {
      src: '/img/boiler/fire-gif.gif',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-1']}`,
      value: data.info['Факел горелки'],
      conditionType: 'boolean',
    },
    {
      src: '/img/boiler/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-2']}`,
      value: data.info['Работа дымососа'],
      conditionType: 'boolean',
      isAnimation: true,
    },
    {
      src: '/img/boiler/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-3']}`,
      value: data.info['Индикация работы вентилятора'],
      conditionType: 'boolean',
      isAnimation: true,
    },
    {
      src: '/img/boiler/ventilator.png',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-4']}`,
      value: data.info['Рабочий режим'],
      conditionType: 'boolean',
      isAnimation: true,
    },
    {
      src: '/img/boiler/iskra.gif',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-5']}`,
      value: data.info['Искрообразование'],
      conditionType: 'boolean',
    },
    {
      src: '/img/boiler/fire-zapalnik.gif',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-6']}`,
      value: data.info['Факел запальника'],
      conditionType: 'boolean',
    },
    {
      src: '/img/boiler/par.gif',
      className: `${styles['mnemo__gif']} ${styles['mnemo__gif-7']}`,
      value: data.info['Рабочий режим'],
      conditionType: 'boolean',
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

export default GifDisplayBoiler;
