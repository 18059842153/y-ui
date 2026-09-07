import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    target: 'node18',
    rollupOptions: {
      external: ['commander', 'prompts', 'picocolors', 'fs', 'path', 'url', 'node:fs', 'node:path', 'node:url'],
    },
  },
  plugins: [
    dts({ skipDiagnostics: true, include: ['src'] }),
    {
      name: 'shebang',
      renderChunk(code) {
        if (code.startsWith('#!')) return code
        return `#!/usr/bin/env node\n${code}`
      },
    },
  ],
})
