import type { NormalizedSeries, ComputedData } from '../../types/index.js';
import { computeBasic } from './column.basic.js';
import { computeStacked } from './column.stacked.js';

export function computeColumn(
  normalized: NormalizedSeries,
  subType: 'basic' | 'stacked'
): ComputedData {
  return subType === 'stacked' ? computeStacked(normalized) : computeBasic(normalized);
}

export { computeBasic, computeStacked };
