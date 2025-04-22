/* eslint-disable @typescript-eslint/no-unused-vars */
import 'chart.js';
import { BackgroundZone } from './configChart';

export interface CrosshairOptions {
  line?: {
    color?: string;
    width?: number;
    dashPattern?: number[];
  };
  sync?: {
    enabled?: boolean;
    group?: number | string;
    suppressTooltips?: boolean;
  };
  zoom?: {
    enabled?: boolean;
    zoomboxBackgroundColor?: string;
    zoomboxBorderColor?: string;
    drag?: boolean;
  };
  snap?: {
    enabled?: boolean;
  };
}

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends keyof ChartTypeRegistry = 'line'> {
    backgroundZonesPlugin?: {
      zones?: BackgroundZone[];
    };
    crosshair?: CrosshairOptions;
  }
}
