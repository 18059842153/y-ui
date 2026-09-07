# Icon

SVG icon renderer with a built-in icon registry and accessibility support.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YIcon } from '@y-ui/vue'
</script>

<template>
  <YIcon name="chevron-down" :size="16" />
  <YIcon name="x" :size="20" color="red" />
</template>
```

```tsx [React]
import { YIcon } from '@y-ui/react'

function Example() {
  return (
    <>
      <YIcon name="chevron-down" size={16} />
      <YIcon name="x" size={20} color="red" />
    </>
  )
}
```

```svelte [Svelte]
<script>
  import { YIcon } from '@y-ui/svelte'
</script>

<YIcon name="chevron-down" size={16} />
<YIcon name="x" size={20} color="red" />
```

:::

## Available Icons

The `@y-ui/icons` package includes 41 core icons:

`chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`, `x`, `check`, `plus`, `minus`, `search`, `menu`, `home`, `user`, `settings`, `edit`, `trash`, `copy`, `download`, `upload`, `eye`, `eye-off`, `lock`, `unlock`, `mail`, `phone`, `calendar`, `clock`, `star`, `heart`, `bookmark`, `share`, `link`, `external-link`, `info`, `alert-circle`, `alert-triangle`, `check-circle`, `x-circle`, `loader`, `arrow-left`, `arrow-right`, `arrow-up`

## Custom Icons

Register custom icons at runtime:

```ts
import { registerIcons } from '@y-ui/icons'

registerIcons({
  'my-icon': {
    name: 'my-icon',
    viewBox: '0 0 24 24',
    paths: ['M12 2L2 22h20L12 2z'],
  },
})
```

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Icon name from registry |
| `size` | `number` | `24` | Width and height in pixels |
| `color` | `string` | `'currentColor'` | Stroke/fill color |
| `strokeWidth` | `number` | `2` | SVG stroke width |
| `title` | `string` | `undefined` | Accessible title (adds `<title>` element) |
| `ariaHidden` | `boolean` | `true` | Hides from screen readers when decorative |
