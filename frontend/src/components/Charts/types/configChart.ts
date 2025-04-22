export interface Config {
  id: string;
  showIntervalSelector: boolean;
}

export interface ConfigParam {
  keyPrefix: string;
  label: string;
  unit?: string;
}

export interface Dataset {
  apiUrl: string;
  dataKey: string;
  params: {
    key: string;
    label: string;
    unit?: string;
  }[];
}

export interface BackgroundZone {
  color: string;
  min: number;
  max: number;
  label: string;
}


export interface ChartProps {
  datasets: Dataset[];
  title: string;
  yMin?: number;
  yMax?: number;
  width?: number | string;
  height?: number | string;
  id: string;
  showIntervalSelector?: boolean;
  animationEnabled?: boolean;
  backgroundZones?: BackgroundZone[];
}
