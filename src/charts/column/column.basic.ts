import type { NormalizedSeries, ComputedData, ComputedBar } from '../../types/index.js';

export function computeBasic(normalized: NormalizedSeries): ComputedData {
  const { labels, data } = normalized;
  const bars: ComputedBar[] = [];

  for (let dataIndex = 0; dataIndex < labels.length; dataIndex++) {
    for (let seriesIndex = 0; seriesIndex < data.length; seriesIndex++) {
      const val = data[seriesIndex].values[dataIndex];
      bars.push({
        dataIndex, seriesIndex,
        value: val.effective,
        stackBase: 0,
        stackTop: val.effective,
        isEmpty: val.isEmpty,
      });
    }
  }

  const nonEmpty = bars.filter(b => !b.isEmpty).map(b => b.value);
  return {
    bars,
    minValue: 0,
    maxValue: nonEmpty.length > 0 ? Math.max(...nonEmpty) : 0,
    labelCount: labels.length,
    seriesCount: data.length,
  };
}
