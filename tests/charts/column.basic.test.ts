import { describe, it, expect } from 'vitest';
import { computeBasic } from '../../src/charts/column/column.basic.js';
import type { NormalizedSeries } from '../../src/types/index.js';

const series: NormalizedSeries = {
  labels: ['A', 'B'],
  data: [
    { legend: 'S1', values: [
      { raw: 10, effective: 10, isEmpty: false },
      { raw: 20, effective: 20, isEmpty: false },
    ]},
    { legend: 'S2', values: [
      { raw: 5, effective: 5, isEmpty: false },
      { raw: null, effective: 0, isEmpty: true },
    ]},
  ],
};

describe('computeBasic', () => {
  it('produces one bar per series × label combination', () => {
    expect(computeBasic(series).bars).toHaveLength(4);
  });

  it('stackBase=0 and stackTop=value for all bars', () => {
    const bar = computeBasic(series).bars.find(b => b.seriesIndex === 0 && b.dataIndex === 0)!;
    expect(bar.stackBase).toBe(0);
    expect(bar.stackTop).toBe(10);
  });

  it('minValue is 0, maxValue is highest value', () => {
    const result = computeBasic(series);
    expect(result.minValue).toBe(0);
    expect(result.maxValue).toBe(20);
  });

  it('preserves isEmpty flag', () => {
    const bar = computeBasic(series).bars.find(b => b.seriesIndex === 1 && b.dataIndex === 1)!;
    expect(bar.isEmpty).toBe(true);
  });
});
