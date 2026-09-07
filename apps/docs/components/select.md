# Select

Select dropdown with keyboard navigation and customizable options.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YSelect } from '@y-ui/vue'
import { ref } from 'vue'

const value = ref('')
const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]
</script>

<template>
  <YSelect v-model="value" :options="options" placeholder="Choose..." />
</template>
```

```tsx [React]
import { YSelect, useSelect } from '@y-ui/react'

function Example() {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]
  const { value, isOpen, getTriggerProps, getOptionProps } = useSelect({ options })

  return (
    <YSelect
      value={value}
      isOpen={isOpen}
      options={options}
      placeholder="Choose..."
      triggerProps={getTriggerProps()}
      optionProps={getOptionProps}
    />
  )
}
```

```svelte [Svelte]
<script>
  import { YSelect } from '@y-ui/svelte'

  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]
  let value = ''
</script>

<YSelect bind:value {options} placeholder="Choose..." />
```

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` / `modelValue` | `string` | `''` | Selected value |
| `options` | `Array<{ label: string; value: string }>` | `[]` | Available options |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the select |
| `error` | `string` | `undefined` | Error message |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size |
