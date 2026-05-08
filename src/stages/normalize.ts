import type { PipelineContext, NormalizedValue } from '../types/index.js';

export function normalizeStage(ctx: PipelineContext): void {
  if (!ctx.config.series || ctx.config.series.length === 0) {
    throw new Error('BivelCharts: config.series must contain at least one entry');
  }

  const raw = ctx.config.series[0];
  const emptyBehavior = ctx.config.chart.rendering?.emptyValue ?? 'skip';

  ctx.normalized = {
    labels: raw.labels,
    data: raw.data.map((entry, i) => {
      if (entry.values.length !== raw.labels.length) {
        throw new Error(
          `BivelCharts: series[0].data[${i}] has ${entry.values.length} values but ${raw.labels.length} labels`
        );
      }
      const values: NormalizedValue[] = entry.values.map((v) => {
        if (v === null || v === 'empty') {
          return { raw: null, effective: 0, isEmpty: emptyBehavior !== 'zero' };
        }
        return { raw: v, effective: v, isEmpty: false };
      });
      return { legend: entry.legend, color: entry.color, values };
    }),
  };
}
