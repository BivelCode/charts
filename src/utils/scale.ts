export function computeYTicks(min: number, max: number, count = 5): number[] {
  const range = max - min || 1;
  const step = niceStep(range / (count - 1));
  const start = Math.floor(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; ticks.length < count + 1 && v <= max + step * 0.01; v += step) {
    ticks.push(Math.round(v * 1e10) / 1e10);
  }
  return ticks;
}

export function niceStep(raw: number): number {
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / mag;
  if (f < 1.5) return mag;
  if (f < 3) return 2 * mag;
  if (f < 7) return 5 * mag;
  return 10 * mag;
}

export function formatTickLabel(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
}
