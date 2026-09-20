import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// The same app, built a second time as an Admin2 custom field that launches it full screen. Rollup
// refuses inlineDynamicImports with multiple inputs, so this is a separate config rather than a second
// entry — and emptyOutDir MUST stay false or this build deletes the page bundle.
export default defineConfig({
  plugins: [svelte({ compilerOptions: { css: 'external' } })],
  build: {
    outDir: 'build',
    emptyOutDir: false,
    minify: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/main.field.js',
      formats: ['es'],
      fileName: () => 'field.js',
      cssFileName: 'field',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
