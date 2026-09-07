import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'create-form-field': resolve(__dirname, 'src/create-form-field.tsx'),
        fields: resolve(__dirname, 'src/fields.tsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        '@y-ui/react',
        '@y-ui/form-core',
      ],
    },
  },
  plugins: [dts({ skipDiagnostics: true, include: ['src'] })],
})
