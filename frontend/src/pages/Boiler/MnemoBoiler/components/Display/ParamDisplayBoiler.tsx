import React from 'react';
import styles from './styles/ParamDisplayBoiler.module.scss';
import TooltipWrapper from '../../../../../ui/Tooltip/Tooltip.tsx';
import { KeyItem } from '../../../../../types/interface.ts';
import { BoilerData } from '../../../../../types/boilerData.ts';

const tooltips: Record<string, string> = {
  davlenieGaza: 'Прибор: ПД-1М.1И\nДиапазон: 0...40 кПа\nТоковый выход: 4 - 20 мА',
  davlenieVozduha: 'Прибор: ПД-1Н.42\nДиапазон: 0...2,5 кПа\nТоковый выход: 4 - 20 мА',
  davleniePara: 'Прибор: Метран-55-ДИ\nДиапазон: 0...1,6 МПа\nТоковый выход: 4 - 20 мА',
  vacuum: 'Прибор: ПД-1ТН.42\nДиапазон: -0,125...+0,125 кПа\nТоковый выход: 4 - 20 мА',
  level: 'Прибор: АИР-20/М2-Н-ДД\nДиапазон: 0...6,3 кПа\nТоковый выход: 4 - 20 мА',
};

const paramKeys: KeyItem[] = [
  {
    key: 'Давление газа перед горелкой',
    name: 'Давление газа',
    className: 'davlenie-gaza',
    tooltip: 'davlenieGaza',
    unit: 'кг/м²',
  },
  {
    key: 'Давление воздуха перед горелкой',
    name: 'Давление воздуха',
    className: 'davlenie-vozduha',
    tooltip: 'davlenieVozduha',
    unit: 'кг/м²',
  },
  {
    key: 'Давление пара на выходе',
    name: 'Давление пара',
    className: 'davlenie-para',
    tooltip: 'davleniePara',
    unit: 'кг/см²',
  },
  {
    key: 'Разрежение в топке котла',
    name: 'Разрежение',
    className: 'vacuum',
    tooltip: 'vacuum',
    unit: 'кг/м²',
  },
  {
    key: 'Уровень в барабане котла',
    name: 'Уровень в барабане',
    className: 'level',
    tooltip: 'level',
    unit: 'мм',
  },
];

interface ParamDisplayProps {
  data: BoilerData;
  tooltipsEnabled: boolean;
}

const ParamDisplayBoiler: React.FC<ParamDisplayProps> = ({ data, tooltipsEnabled }) => {
  return (
    <>
      {paramKeys.map((param) => {
        const paramElement = (
          <div
            key={param.key}
            className={`${styles['mnemo__param']} ${styles[param.className]} ${tooltipsEnabled ? styles['enabled'] : ''}`}
          >
            <div className={`${styles['mnemo__param-naimenov']}`}>{param.name}</div>
            <div className={`${styles['mnemo__param-text']}`}>
              <div className={`${styles['mnemo__param-value']}`}>{data.parameters?.[param.key || '']}</div>
              <div className={`${styles['mnemo__param-span']}`}>{param.unit}</div>
            </div>
          </div>
        );

        return tooltipsEnabled ? (
          <TooltipWrapper key={param.tooltip} title={tooltips[param.tooltip || '']}>
            {paramElement}
          </TooltipWrapper>
        ) : paramElement;
      })}
    </>
  );
};

export default ParamDisplayBoiler;