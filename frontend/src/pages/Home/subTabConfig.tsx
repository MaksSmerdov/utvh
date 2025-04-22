import { JSX } from 'react';
import { FaChartBar, FaTable, FaWrench } from 'react-icons/fa';

export interface SubtabItem {
  label: string;
  value: string;
  icon: JSX.Element;
}

export const subtabsConfig: Record<string, SubtabItem[]> = {
  boiler: [
    { label: 'Параметры', value: 'current', icon: <FaTable /> },
    { label: 'Мнемосхема', value: 'mnemo', icon: <FaWrench /> },
    { label: 'Графики уровня', value: 'levelChart', icon: <FaChartBar /> },
    { label: 'Графики газа', value: 'gazChart', icon: <FaChartBar /> },
    { label: 'Графики разрежения', value: 'vacuumChart', icon: <FaChartBar /> },
    { label: 'Графики воздуха', value: 'airChart', icon: <FaChartBar /> },
    { label: 'Графики пара', value: 'steamChart', icon: <FaChartBar /> },
  ],
  hvo: [
    { label: 'Параметры', value: 'current', icon: <FaTable /> },
    { label: 'Мнемосхема', value: 'mnemo', icon: <FaWrench /> },
    { label: 'Графики уровня', value: 'levelChart', icon: <FaChartBar /> },
    { label: 'Графики расхода', value: 'flowChart', icon: <FaChartBar /> },
  ],
};
