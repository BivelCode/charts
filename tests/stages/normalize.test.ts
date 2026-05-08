import { describe, it, expect } from 'vitest';
import { normalizeStage } from '../../src/stages/normalize.js';
import type { PipelineContext } from '../../src/types/index.js';

function makeCtx(emptyValue: 'skip' | 'zero' | 'gap' = 'skip'): PipelineContext {
  return {
    config: {
      series: [{
        labels: ['A', 'B', 'C'],
        data: [
          { legend: 'S1', values: [10, null, 30] },
          { legend: 'S2', values: [5, 'empty', 15] },
        ],
      }],
      chart: { type: 'column', rendering: { emptyValue } },
    },
    containerWidth: 600, containerHeight: 400,
    normalized: null, computed: null, layout: null, meta: {},
  };
}

describe('normalizeStage', () => {
  it('populates ctx.normalized with labels and data', () => {
    const ctx = makeCtx();
    normalizeStage(ctx);
    expect(ctx.normalized!.labels).toEqual(['A', 'B', 'C']);
    expect(ctx.normalized!.data).toHaveLength(2);
  });

  it('null → isEmpty:true, effective:0 when emptyValue=skip', () => {
    const ctx = makeCtx('skip');
    normalizeStage(ctx);
    const v = ctx.normalized!.data[0].values[1];
    expect(v.isEmpty).toBe(true);
    expect(v.effective).toBe(0);
    expect(v.raw).toBeNull();
  });

  it('"empty" string → isEmpty:true', () => {
    const ctx = makeCtx('skip');
    normalizeStage(ctx);
    expect(ctx.normalized!.data[1].values[1].isEmpty).toBe(true);
  });

  it('null → isEmpty:false when emptyValue=zero', () => {
    const ctx = makeCtx('zero');
    normalizeStage(ctx);
    const v = ctx.normalized!.data[0].values[1];
    expect(v.isEmpty).toBe(false);
    expect(v.effective).toBe(0);
  });

  it('preserves normal numeric values', () => {
    const ctx = makeCtx();
    normalizeStage(ctx);
    const v = ctx.normalized!.data[0].values[0];
    expect(v.raw).toBe(10);
    expect(v.effective).toBe(10);
    expect(v.isEmpty).toBe(false);
  });

  it('throws if labels.length !== values.length', () => {
    const ctx = makeCtx();
    ctx.config.series[0].data[0].values = [1, 2]; // 2 values, 3 labels
    expect(() => normalizeStage(ctx)).toThrow(
      'BivelCharts: series[0].data[0] has 2 values but 3 labels'
    );
  });

  it('throws if series is empty', () => {
    const ctx = makeCtx();
    ctx.config.series = [];
    expect(() => normalizeStage(ctx)).toThrow(
      'BivelCharts: config.series must contain at least one entry'
    );
  });
});
