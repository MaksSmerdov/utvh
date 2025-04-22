import React from 'react';
import styles from '../../MnemoHvoFirst.module.scss';
import TooltipWrapper from '../../../../../ui/Tooltip/Tooltip.tsx';
import { HvoItem } from '../../../../../types/interface.ts';
import { HvoFirstData } from '../../../../../types/hvoData.ts';

const tooltips: Record<string, string> = {
  mida: 'Прибор: МИДА-ДИ-15\nДиапазон: 0...1 МПа\nТоковый выход: 4 - 20 мА',
  ugc: 'Прибор: УГЦ-1.1\nДиапазон: 0...1,6 м\nТоковый выход: 4 - 20 мА',
  prim100: 'Прибор: ПРИМ-100-1-0\nДиаметр: Ду100\nРасход: Qнаим=0,75 м3/ч\nQперех=1,5 м3/ч\nQнаиб=150 м3/ч',
  prim80: 'Прибор: ПРИМ-80-1-0\nДиаметр: Ду80\nРасход: Qнаим=0,75 м3/ч\nQперех=1,5 м3/ч\nQнаиб=150 м3/ч',
};

const paramKeys: HvoItem[] = [
  {
    key: 'Давление воды на входе установки',
    sourceFirst: 'pressures',
    className: 'davl-vhod-ustanivki',
    tooltip: 'mida',
    unit: 'кг/см²',
  },
  {
    key: 'Расход воды на установку',
    sourceFirst: 'flows',
    className: 'rashod-vody-na-ustanovky',
    tooltip: 'prim80',
    unit: 'м³/ч',
  },
  {
    key: 'Давление воды после насосов H1/1,2,3',
    sourceFirst: 'pressures',
    className: 'davl-posle-nasosov-1-1-2-3',
    tooltip: 'mida',
    unit: 'кг/м²',
  },
  {
    key: 'Уровень воды в емкости E1/1',
    sourceFirst: 'levels',
    className: 'uroven-e1-1',
    tooltip: 'ugc',
    unit: 'мм',
  },
  {
    key: 'Уровень воды в емкости E1/2',
    sourceFirst: 'levels',
    className: 'uroven-e1-2',
    tooltip: 'ugc',
    unit: 'мм',
  },
  {
    key: 'Расход воды на промывку фильтров',
    sourceFirst: 'flows',
    className: 'rashod-vody-na-promyvky',
    tooltip: 'prim100',
    unit: 'м³/ч',
  },
  {
    key: 'Давление воды после насосов H2/1,2',
    sourceFirst: 'pressures',
    className: 'davl-posle-nasosov-2-1-2',
    tooltip: 'mida',
    unit: 'кгс/м²',
  },
  {
    key: 'Давление воды после насосов H3/1,2',
    sourceFirst: 'pressures',
    className: 'davl-posle-nasosov-3-1-2',
    tooltip: 'mida',
    unit: 'кгс/м²',
  },
  {
    key: 'Контроль положения ИМ1',
    sourceFirst: 'others',
    className: 'kontrol-im-1',
    unit: '%',
  },
  {
    key: 'Задание уровня воды в емкостях E1/1,2',
    sourceFirst: 'task',
    className: 'zadanie-uroven-e1-1-2',
    unit: '%',
  },
  {
    key: 'Выход РАН давления воды для ПЧ H1/1',
    sourceFirst: 'frequency',
    className: 'n1-1-percent',
    unit: '%',
  },
  {
    key: 'Рабочая частота насоса H1/1',
    sourceFirst: 'frequency',
    className: 'n1-1-hz',
    unit: 'Гц',
  },
  {
    key: 'Выход РАН давления воды для ПЧ H1/2',
    sourceFirst: 'frequency',
    className: 'n1-2-percent',
    unit: '%',
  },
  {
    key: 'Рабочая частота насоса H1/2',
    sourceFirst: 'frequency',
    className: 'n1-2-hz',
    unit: 'Гц',
  },
  {
    key: 'Выход РАН давления воды для ПЧ H2/1',
    sourceFirst: 'frequency',
    className: 'n2-1-percent',
    unit: '%',
  },
  {
    key: 'Рабочая частота насоса H2/1',
    sourceFirst: 'frequency',
    className: 'n2-1-hz',
    unit: 'Гц',
  },
  {
    key: 'Выход РАН давления воды для ПЧ H2/2',
    sourceFirst: 'frequency',
    className: 'n2-2-percent',
    unit: '%',
  },
  {
    key: 'Рабочая частота насоса H2/2',
    sourceFirst: 'frequency',
    className: 'n2-2-hz',
    unit: 'Гц',
  },

];

interface ParamDisplayProps {
  data: HvoFirstData;
  tooltipsEnabled: boolean;
}

const ParamDisplayHvoFirst: React.FC<ParamDisplayProps> = ({ data, tooltipsEnabled }) => {
  return (
    <>
      {paramKeys.map((param) => {
        const paramElement = (
          <div
            key={param.key}
            className={`${styles['mnemo__param']} ${styles[param.className]} ${tooltipsEnabled ? styles['enabled'] : ''}`}
          >
            <div className={`${styles['mnemo__param-text']}`}>
              {data[param.sourceFirst!][param.key]}
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

export default ParamDisplayHvoFirst;
