# Card

Card container with header, body, cover image, and loading state.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YCard } from '@y-ui/vue'
</script>

<template>
  <YCard>
    <template #header>
      <template #title>Card Title</template>
      <template #extra><a href="#">More</a></template>
    </template>
    <p>Card content goes here.</p>
  </YCard>
</template>
```

```tsx [React]
import { YCard } from '@y-ui/react'

function Example() {
  return (
    <YCard title="Card Title" extra={<a href="#">More</a>}>
      <p>Card content goes here.</p>
    </YCard>
  )
}
```

```svelte [Svelte]
<script>
  import { YCard } from '@y-ui/svelte'
</script>

<YCard title="Card Title">
  <svelte:fragment slot="extra"><a href="#">More</a></svelte:fragment>
  <p>Card content goes here.</p>
</YCard>
```

:::

## Sizes

```vue
<YCard size="sm">Small card</YCard>
<YCard size="md">Medium card</YCard>
<YCard size="lg">Large card</YCard>
```

## With Cover Image

```vue
<YCard>
  <template #cover>
    <img src="https://picsum.photos/400/200" alt="Cover" />
  </template>
  <p>Card with cover image.</p>
</YCard>
```

## Loading

```vue
<YCard loading />
```

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Card title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `bordered` | `boolean` | `true` | Shows border |
| `hoverable` | `boolean` | `false` | Adds hover shadow effect |
| `loading` | `boolean` | `false` | Shows loading state |
