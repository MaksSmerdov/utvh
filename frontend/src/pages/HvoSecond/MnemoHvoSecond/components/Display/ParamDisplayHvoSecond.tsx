import React from 'react';
import styles from '../../MnemoHvoSecond.module.scss';
import TooltipWrapper from '../../../../../ui/Tooltip/Tooltip.tsx';
import { HvoItem } from '../../../../../types/interface.ts';
import { HvoSecondData } from '../../../../../types/hvoData.ts';

const tooltips: Record<string, string> = {
  mida: 'Прибор: МИДА-ДИ-15\nДиапазон: 0...1 МПа\nТоковый выход: 4 - 20 мА',
  ugc: 'Прибор: УГЦ-1.1\nДиапазон: 0...1,6 м\nТоковый выход: 4 - 20 мА',
  prim100: 'Прибор: ПРИМ-100-1-0\nДиаметр: Ду100\nРасход: Qнаим=0,75 м3/ч\nQперех=1,5 м3/ч\nQнаиб=150 м3/ч',
  prim80: 'Прибор: ПРИМ-80-1-0\nДиаметр: Ду80\nРасход: Qнаим=0,75 м3/ч\nQперех=1,5 м3/ч\nQнаиб=150 м3/ч',
  prim50: 'Прибор: ПРИМ-50-1-0\nДиаметр: Ду50\nРасход: Qнаим=0,3 м3/ч\nQперех=0,6 м3/ч\nQнаиб=60 м3/ч',
  owen: 'Прибор: ДТС Овен\nДлина: 800мм\n',
};

const paramKeys: HvoItem[] = [
  {
    key: 'Расход умягченной воды после Ф4/1,2,3',
    sourceSecond: 'flows',
    className: 'rashod-vody-filtr',
    tooltip: 'prim100',
    unit: 'м³/ч',
  },
  {
    key: 'Расход воды в канализацию',
    sourceSecond: 'flows',
    className: 'rashod-kanalizacia',
    tooltip: 'prim50',
    unit: 'м³/ч',
  },
  {
    key: 'Давление воды на карбон',
    sourceSecond: 'pressures',
    className: 'davlenie-carbon',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды на к265',
    sourceSecond: 'pressures',
    className: 'davlenie-k265',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды на к312',
    sourceSecond: 'pressures',
    className: 'davlenie-k312',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  // {
  //   key: 'Температура в емкости E2/1 юг',
  //   sourceSecond: 'temperatures',
  //   className: 'temper-e2-1-ug',
  //   tooltip: 'owen',
  //   unit: '°C',
  // },
  {
    key: 'Температура в емкости E2/1 север',
    sourceSecond: 'temperatures',
    className: 'temper-e2-1-sever',
    tooltip: 'owen',
    unit: '°C',
  },
  {
    key: 'Давление воды после насоса H4/1',
    sourceSecond: 'pressures',
    className: 'davlenie-n4-1',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после насоса H4/2',
    sourceSecond: 'pressures',
    className: 'davlenie-n4-2',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после насоса H5/1',
    sourceSecond: 'pressures',
    className: 'davlenie-n5-1',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после насоса H5/2',
    sourceSecond: 'pressures',
    className: 'davlenie-n5-2',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после насоса H6/1',
    sourceSecond: 'pressures',
    className: 'davlenie-n6-1',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после насоса H6/2',
    sourceSecond: 'pressures',
    className: 'davlenie-n6-2',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после насоса H6/3',
    sourceSecond: 'pressures',
    className: 'davlenie-n6-3',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Давление воды после Ф4/1,2,3',
    sourceSecond: 'pressures',
    className: 'davlenie-posle-filtrov',
    tooltip: 'mida',
    unit: 'кгс/cм²',
  },
  {
    key: 'Уровень воды в E2/1 (Титан)',
    sourceSecond: 'levels',
    className: 'uroven-titan-e2-1',
    unit: 'мм',
  },
  {
    key: 'Уровень воды в E2/1 (Мида)',
    sourceSecond: 'levels',
    className: 'uroven-mida-e2-1',
    unit: 'мм',
  },
  {
    key: 'Контроль положения ИМ2',
    sourceSecond: 'others',
    className: 'im2',
    unit: '%',
  },
  {
    key: 'Рабочая частота насоса H4/1',
    sourceSecond: 'frequency',
    className: 'n4-1-hz',
    unit: 'Гц',
  },
  {
    key: 'Рабочая частота насоса H4/2',
    sourceSecond: 'frequency',
    className: 'n4-2-hz',
    unit: 'Гц',
  },
  {
    key: 'Рабочая частота насоса H5/1',
    sourceSecond: 'frequency',
    className: 'n5-1-hz',
    unit: 'Гц',
  },
  {
    key: 'Рабочая частота насоса H5/2',
    sourceSecond: 'frequency',
    className: 'n5-2-hz',
    unit: 'Гц',
  },
  {
    key: 'Рабочая частота насоса H6/1',
    sourceSecond: 'frequency',
    className: 'n6-1-hz',
    unit: 'Гц',
  },
  {
    key: 'Рабочая частота насоса H6/2',
    sourceSecond: 'frequency',
    className: 'n6-2-hz',
    unit: 'Гц',
  },
  {
    key: 'Рабочая частота насоса H6/3',
    sourceSecond: 'frequency',
    className: 'n6-3-hz',
    unit: 'Гц',
  },
];

interface ParamDisplayProps {
  data: HvoSecondData;
  tooltipsEnabled: boolean;
}

const ParamDisplayHvoSecond: React.FC<ParamDisplayProps> = ({ data, tooltipsEnabled }) => {
  return (
    <>
      {paramKeys.map((param) => {
        const paramElement = (
          <div
            key={param.key}
            className={`${styles['mnemo__param']} ${styles[param.className]} ${tooltipsEnabled ? styles['enabled'] : ''}`}
          >
            <div className={`${styles['mnemo__param-text']}`}>
              {data[param.sourceSecond!][param.key]}
            </div>
            <div className={`${styles['mnemo__param-naimenov']}`}>
              {param.unit}
            </div>
          </div>
        );

        return tooltipsEnabled ? (
          <TooltipWrapper key={param.key} title={tooltips[param.tooltip || '']}>
            {paramElement}
          </TooltipWrapper>
        ) : paramElement;
      })}

    </>
  );
};

export default ParamDisplayHvoSecond;
