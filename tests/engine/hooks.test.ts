import { describe, it, expect, vi } from 'vitest';
import { HookRegistry } from '../../src/engine/hooks.js';
import type { PipelineContext } from '../../src/types/index.js';

const makeCtx = (): PipelineContext => ({
  config: { series: [], chart: { type: 'column' } },
  containerWidth: 600, containerHeight: 400,
  normalized: null, computed: null, layout: null, meta: {},
});

describe('HookRegistry', () => {
  it('runs a registered hook', () => {
    const reg = new HookRegistry();
    const fn = vi.fn();
    reg.register('after:normalize', fn);
    reg.run('after:normalize', makeCtx());
    expect(fn).toHaveBeenCalledOnce();
  });

  it('runs multiple hooks on the same name in registration order', () => {
    const reg = new HookRegistry();
    const order: number[] = [];
    reg.register('after:compute', () => order.push(1));
    reg.register('after:compute', () => order.push(2));
    reg.run('after:compute', makeCtx());
    expect(order).toEqual([1, 2]);
  });

  it('passes context to hook', () => {
    const reg = new HookRegistry();
    let received: PipelineContext | null = null;
    reg.register('before:normalize', (ctx) => { received = ctx; });
    const ctx = makeCtx();
    reg.run('before:normalize', ctx);
    expect(received).toBe(ctx);
  });

  it('after:render receives element as second arg', () => {
    const reg = new HookRegistry();
    let receivedEl: Element | null = null;
    reg.registerAfterRender((_ctx, el) => { receivedEl = el; });
    const el = document.createElement('svg');
    reg.runAfterRender(makeCtx(), el);
    expect(receivedEl).toBe(el);
  });

  it('clear removes all hooks', () => {
    const reg = new HookRegistry();
    const fn = vi.fn();
    reg.register('after:layout', fn);
    reg.clear();
    reg.run('after:layout', makeCtx());
    expect(fn).not.toHaveBeenCalled();
  });

  it('running an unregistered hook does nothing', () => {
    const reg = new HookRegistry();
    expect(() => reg.run('before:render', makeCtx())).not.toThrow();
  });
});
