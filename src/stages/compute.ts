import type { PipelineContext } from '../types/index.js';
import { computeColumn } from '../charts/column/index.js';

export function computeStage(ctx: PipelineContext): void {
  if (!ctx.normalized) throw new Error('BivelCharts: normalize stage must run first');
  ctx.computed = computeColumn(ctx.normalized, ctx.config.chart.subType ?? 'basic');
}
