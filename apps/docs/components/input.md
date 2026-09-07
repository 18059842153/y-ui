# Input

Text input with prefix/suffix slots, clear button, and validation states.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YInput } from '@y-ui/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <YInput v-model="value" placeholder="Enter text..." />
</template>
```

```tsx [React]
import { YInput } from '@y-ui/react'
import { useState } from 'react'

function Example() {
  const [value, setValue] = useState('')
  return <YInput value={value} onChange={setValue} placeholder="Enter text..." />
}
```

```svelte [Svelte]
<script>
  import { YInput } from '@y-ui/svelte'

  let value = ''
</script>

<YInput bind:value placeholder="Enter text..." />
```

:::

## Sizes

```vue
<YInput size="sm" placeholder="Small" />
<YInput size="md" placeholder="Medium" />
<YInput size="lg" placeholder="Large" />
```

## With Prefix/Suffix

```vue
<YInput prefix-icon="search" placeholder="Search..." />
<YInput suffix-icon="at-sign" placeholder="Email" />
```

## Clearable

```vue
<YInput clearable v-model="value" />
```

## Error State

```vue
<YInput error="This field is required" v-model="value" />
```

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` / `modelValue` | `string` | `''` | Input value |
| `placeholder` | `string` | `''` | Placeholder text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `disabled` | `boolean` | `false` | Disables the input |
| `error` | `string` | `undefined` | Error message |
| `clearable` | `boolean` | `false` | Shows clear button |
| `prefixIcon` | `string` | `undefined` | Icon name for prefix |
| `suffixIcon` | `string` | `undefined` | Icon name for suffix |
| `type` | `string` | `'text'` | HTML input type |
