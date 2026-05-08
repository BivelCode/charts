import { describe, it, expect } from 'vitest';
import { computeStacked } from '../../src/charts/column/column.stacked.js';
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
      { raw: 8, effective: 8, isEmpty: false },
    ]},
  ],
};

describe('computeStacked', () => {
  it('S2 stackBase = S1 stackTop for same label', () => {
    const bar = computeStacked(series).bars.find(b => b.seriesIndex === 1 && b.dataIndex === 0)!;
    expect(bar.stackBase).toBe(10);
    expect(bar.stackTop).toBe(15);
  });

  it('maxValue = highest stack total across all labels', () => {
    expect(computeStacked(series).maxValue).toBe(28); // 20+8
  });

  it('minValue is 0 when no negative values', () => {
    expect(computeStacked(series).minValue).toBe(0);
  });
});
