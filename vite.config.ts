import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      outDir: 'packages/core/dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BivelCharts',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'bivelcharts.esm.js';
        if (format === 'cjs') return 'bivelcharts.cjs.js';
        return 'bivelcharts.umd.js';
      },
    },
    outDir: 'packages/core/dist',
    rollupOptions: { external: [] },
  },
});
