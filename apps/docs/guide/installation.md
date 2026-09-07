# Installation

## npm

Install the package for your framework:

```bash
# React
npm install @y-ui/react @y-ui/tokens

# Vue
npm install @y-ui/vue @y-ui/tokens

# Svelte
npm install @y-ui/svelte @y-ui/tokens
```

## Import CSS

Import the token CSS in your app entry:

```ts
import '@y-ui/tokens/dist/index.css'
```

## Use Components

::: code-group

```tsx [React]
import { YButton } from '@y-ui/react'

function App() {
  return <YButton variant="primary" onClick={() => alert('clicked')}>Click me</YButton>
}
```

```vue [Vue]
<script setup>
import { YButton } from '@y-ui/vue'
</script>

<template>
  <YButton variant="primary" @click="alert('clicked')">Click me</YButton>
</template>
```

```svelte [Svelte]
<script>
  import { YButton } from '@y-ui/svelte'
</script>

<YButton variant="primary" on:click={() => alert('clicked')}>Click me</YButton>
```

:::

## UnoCSS Preset (Optional)

For atomic CSS shortcuts, install the UnoCSS preset:

```bash
npm install @y-ui/uno-preset
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetYui } from '@y-ui/uno-preset'

export default defineConfig({
  presets: [presetYui()],
})
```

## CLI (Recommended)

For copy-paste workflow without npm dependencies:

```bash
npx y-ui-cli init
npx y-ui-cli add button input select
```

See the [CLI guide](/guide/cli) for details.
