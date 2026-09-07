# Button

Button component with variants, sizes, loading state, and icon support.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YButton } from '@y-ui/vue'
</script>

<template>
  <YButton variant="primary">Primary</YButton>
  <YButton variant="secondary">Secondary</YButton>
  <YButton variant="outline">Outline</YButton>
  <YButton variant="ghost">Ghost</YButton>
  <YButton variant="danger">Danger</YButton>
</template>
```

```tsx [React]
import { YButton } from '@y-ui/react'

function Example() {
  return (
    <>
      <YButton variant="primary">Primary</YButton>
      <YButton variant="secondary">Secondary</YButton>
      <YButton variant="outline">Outline</YButton>
      <YButton variant="ghost">Ghost</YButton>
      <YButton variant="danger">Danger</YButton>
    </>
  )
}
```

```svelte [Svelte]
<script>
  import { YButton } from '@y-ui/svelte'
</script>

<YButton variant="primary">Primary</YButton>
<YButton variant="secondary">Secondary</YButton>
<YButton variant="outline">Outline</YButton>
<YButton variant="ghost">Ghost</YButton>
<YButton variant="danger">Danger</YButton>
```

:::

## Sizes

```vue
<YButton size="sm">Small</YButton>
<YButton size="md">Medium</YButton>
<YButton size="lg">Large</YButton>
```

## Loading State

```vue
<YButton loading>Loading...</YButton>
```

## Block

```vue
<YButton block>Full Width</YButton>
```

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Shows spinner and disables interaction |
| `disabled` | `boolean` | `false` | Disables the button |
| `block` | `boolean` | `false` | Full-width button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired on click (not fired when loading/disabled) |
