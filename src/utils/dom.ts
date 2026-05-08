export function resolveContainer(selector: string | Element): Element {
  if (typeof selector !== 'string') return selector;
  const el = document.querySelector(selector);
  if (!el) throw new Error(`BivelCharts: container not found "${selector}"`);
  return el;
}

export function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {}
): SVGElementTagNameMap[K] {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

export function svgG(attrs: Record<string, string> = {}): SVGGElement {
  return svgEl('g', attrs);
}
