import type { BivelChartsConfig } from '../types/config.js';

export const DEFAULT_PALETTE = [
  '#008FFB', '#00E396', '#FEB019', '#FF4560',
  '#775DD0', '#546E7A', '#26a69a', '#D10CE8',
];

export function resolveColors(config: BivelChartsConfig, count: number): string[] {
  const r = config.chart.rendering;
  if (!r?.colors) return DEFAULT_PALETTE.slice(0, count);
  if (r.fill === 'monochrome' && typeof r.colors === 'string') {
    return generateMonochrome(r.colors, count);
  }
  if (Array.isArray(r.colors)) {
    return Array.from({ length: count }, (_, i) =>
      (r.colors as string[])[i % (r.colors as string[]).length]
    );
  }
  return Array.from({ length: count }, () => r.colors as string);
}

export function generateMonochrome(baseHex: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    hexToRgba(baseHex, Math.max(1 - i * 0.18, 0.25))
  );
}

export function hexToRgba(hex: string, alpha: number): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
}

export function resolveOpacity(cfg: number | number[] | undefined, index: number): number {
  if (cfg === undefined) return 1;
  if (typeof cfg === 'number') return cfg;
  return cfg[index % cfg.length] ?? 1;
}
