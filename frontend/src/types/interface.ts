import { HvoFirstData, HvoSecondData } from './hvoData.ts';

export interface SensorData {
  [key: string]: number;
}

export interface BooleanSensorData {
  [key: string]: boolean;
}

export interface SensorParameter {
  label: string;
  unit?: string;
}

export interface KeyItem {
  key?: string;
  name?: string;
  className: string;
  tooltip?: string;
  unit?: string;
}

export interface HvoItem {
  key: string;
  sourceFirst?: keyof HvoFirstData;
  sourceSecond?: keyof HvoSecondData;
  className: string;
  tooltip?: string;
  unit?: string;
}

export interface LabelItem {
  text: string;
  className: string;
}

export interface ModalDocumentationProps {
  open: boolean;
  onClose: () => void;
}