import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    svelte({ compilerOptions: { customElement: false } }),
    dts({ rollupTypes: false }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['svelte', 'svelte/internal', '@y-ui/core'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
})
