import type { PipelineContext } from '../types/index.js';

export type HookName =
  | 'before:normalize' | 'after:normalize'
  | 'before:compute'   | 'after:compute'
  | 'before:layout'    | 'after:layout'
  | 'before:render';

type HookFn = (ctx: PipelineContext) => void;
type AfterRenderFn = (ctx: PipelineContext, el: Element) => void;

export class HookRegistry {
  private hooks = new Map<HookName, HookFn[]>();
  private afterRenderHooks: AfterRenderFn[] = [];

  register(name: HookName, fn: HookFn): void {
    const existing = this.hooks.get(name) ?? [];
    this.hooks.set(name, [...existing, fn]);
  }

  registerAfterRender(fn: AfterRenderFn): void {
    this.afterRenderHooks = [...this.afterRenderHooks, fn];
  }

  run(name: HookName, ctx: PipelineContext): void {
    for (const fn of this.hooks.get(name) ?? []) fn(ctx);
  }

  runAfterRender(ctx: PipelineContext, el: Element): void {
    for (const fn of this.afterRenderHooks) fn(ctx, el);
  }

  clear(): void {
    this.hooks.clear();
    this.afterRenderHooks = [];
  }
}
