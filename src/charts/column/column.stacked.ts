import type { NormalizedSeries, ComputedData, ComputedBar } from '../../types/index.js';

export function computeStacked(normalized: NormalizedSeries): ComputedData {
  const { labels, data } = normalized;
  const bars: ComputedBar[] = [];

  for (let dataIndex = 0; dataIndex < labels.length; dataIndex++) {
    let stackTop = 0;
    for (let seriesIndex = 0; seriesIndex < data.length; seriesIndex++) {
      const val = data[seriesIndex].values[dataIndex];
      const stackBase = stackTop;
      if (!val.isEmpty) stackTop += val.effective;
      bars.push({
        dataIndex, seriesIndex,
        value: val.effective,
        stackBase,
        stackTop: val.isEmpty ? stackBase : stackTop,
        isEmpty: val.isEmpty,
      });
    }
  }

  const tops = bars.filter(b => !b.isEmpty).map(b => b.stackTop);
  return {
    bars,
    minValue: 0,
    maxValue: tops.length > 0 ? Math.max(...tops) : 0,
    labelCount: labels.length,
    seriesCount: data.length,
  };
}
