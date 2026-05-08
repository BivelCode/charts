import type { PipelineContext } from '../types/index.js';
import { HookRegistry } from './hooks.js';
import { normalizeStage } from '../stages/normalize.js';
import { computeStage } from '../stages/compute.js';
import { layoutStage } from '../stages/layout.js';

export class Pipeline {
  constructor(private readonly hooks: HookRegistry) {}

  run(ctx: PipelineContext): void {
    this.hooks.run('before:normalize', ctx);
    normalizeStage(ctx);
    this.hooks.run('after:normalize', ctx);

    this.hooks.run('before:compute', ctx);
    computeStage(ctx);
    this.hooks.run('after:compute', ctx);

    this.hooks.run('before:layout', ctx);
    layoutStage(ctx);
    this.hooks.run('after:layout', ctx);
  }
}
