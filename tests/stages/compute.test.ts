import { describe, it, expect } from 'vitest';
import { normalizeStage } from '../../src/stages/normalize.js';
import { computeStage } from '../../src/stages/compute.js';
import type { PipelineContext } from '../../src/types/index.js';

function makeCtx(subType: 'basic' | 'stacked' = 'basic'): PipelineContext {
  return {
    config: {
      series: [{ labels: ['Q1', 'Q2'], data: [
        { legend: 'A', values: [10, 20] },
        { legend: 'B', values: [5, 15] },
      ]}],
      chart: { type: 'column', subType },
    },
    containerWidth: 600, containerHeight: 400,
    normalized: null, computed: null, layout: null, meta: {},
  };
}

describe('computeStage', () => {
  it('throws if normalize has not run', () => {
    expect(() => computeStage(makeCtx())).toThrow('normalize stage must run first');
  });

  it('basic: 4 bars for 2 series × 2 labels', () => {
    const ctx = makeCtx('basic');
    normalizeStage(ctx); computeStage(ctx);
    expect(ctx.computed!.bars).toHaveLength(4);
  });

  it('basic: maxValue is highest individual value', () => {
    const ctx = makeCtx('basic');
    normalizeStage(ctx); computeStage(ctx);
    expect(ctx.computed!.maxValue).toBe(20);
  });

  it('stacked: maxValue is highest stack total', () => {
    const ctx = makeCtx('stacked');
    normalizeStage(ctx); computeStage(ctx);
    expect(ctx.computed!.maxValue).toBe(35); // 20+15
  });
});
