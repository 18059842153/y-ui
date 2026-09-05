import type { MitosisConfig, Target } from '@builder.io/mitosis-config'

export default {
  files: 'src/**/*.tsx',
  targets: ['react', 'vue', 'svelte'] as Target[],
  dest: {
    react: '../react/src',
    vue: '../vue/src',
    svelte: '../svelte/src',
  },
  options: {
    react: {
      stylesType: 'none',
    },
    vue: {
      api: 'composition',
    },
    svelte: {},
  },
} as MitosisConfig
