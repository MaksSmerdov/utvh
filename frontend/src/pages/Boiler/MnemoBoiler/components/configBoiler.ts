import { KeyItem } from '../../../../types/interface.ts';

export const alarmLabels: KeyItem[] = [
  { name: 'Давл. воздуха низко', className: 'alarm__vozduh-low', key: `Давление воздуха низко` },
  { name: 'Давл. газа низко', className: 'alarm__gaz-low', key: `Давление газа низко` },
  { name: 'Давл. газа высоко', className: 'alarm__gaz-high', key: `Давление газа высоко` },
  { name: 'Уровень воды низок', className: 'alarm__level-low', key: `Уровень низок` },
  { name: 'Уровень воды высок', className: 'alarm__level-high', key: `Уровень высок` },
  { name: 'Факел горелки погас', className: 'alarm__torch-disappeared', key: `Факел горелки погас` },
  { name: 'Разрежение мало', className: 'alarm__vacuum-low', key: `Разрежение мало` },
  { name: 'Дымосос отключен', className: 'alarm__smoke-off', key: `Дымосос отключен` },
  { name: 'Санкц. останов котла', className: 'alarm__boiler-stop', key: `Останов по команде` },
];

export const infoLabels: KeyItem[] = [
  { name: 'Останов котла', className: 'info__boiler-stop', key: `Останов котла` },
  { name: 'Режим вентиляции', className: 'info__fan-mode', key: `Режим вентиляции` },
  { name: 'Розжиг запальника', className: 'info__ignition', key: `Розжиг запальника` },
  { name: 'Режим стаб. запальника', className: 'info__stabilization', key: `Режим стабилизации запальника` },
  { name: 'Розжиг горелки', className: 'info__ignition-burner', key: `Розжиг горелки` },
  { name: 'Режим стаб. горелки', className: 'info__stabilization-burner', key: `Режим стабилизации горелки` },
  { name: 'Рабочий режим', className: 'info__work-mode', key: `Рабочий режим` },
];

export const staticLabels: KeyItem[] = [
  { name: 'Вентилятор', className: 'text__fan' },
  { name: 'Дымосос', className: 'text__smoke' },
];

export const imLabels: KeyItem[] = [
  { name: `ИМ уровня`, className: 'im__level' },
  { name: `ИМ разрежения`, className: 'im__vacuum' },
  { name: `ИМ воздуха`, className: 'im__vozduh' },
  { name: `ИМ газа`, className: 'im__gaz' },
];