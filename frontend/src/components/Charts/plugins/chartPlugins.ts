import { Plugin } from 'chart.js';
import { BackgroundZone } from '../types/configChart.ts';

export const chartAreaBorder: Plugin<'line'> = {
  id: 'chartAreaBorder',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;

    if (!chartArea) return;

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.strokeRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    ctx.restore();
  },
};

export const backgroundZonesPlugin: Plugin<'line'> = {
  id: 'backgroundZonesPlugin',
  beforeDraw(chart) {
    const {
      ctx,
      chartArea,
      scales: { y },
    } = chart;
    if (!chartArea || !y) return;
    const zones = chart.options.plugins?.backgroundZonesPlugin?.zones as
      | BackgroundZone[]
      | undefined;
    if (!zones || zones.length === 0) return;

    zones.forEach((zone) => {
      const yMin = y.getPixelForValue(zone.min);
      const yMax = y.getPixelForValue(zone.max);

      ctx.save();
      ctx.fillStyle = zone.color;
      ctx.fillRect(chartArea.left, yMax, chartArea.width, yMin - yMax);

      ctx.fillStyle = 'black';
      ctx.font = 'bold 14px Sans-Serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const margin = 4;
      const labelX = chartArea.left + margin;
      const labelY = yMax + margin;
      ctx.fillText(zone.label, labelX, labelY);
      ctx.restore();
    });
  },
};
