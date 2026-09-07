# FormField

Form field wrapper with label, error message, hint text, and ARIA attributes.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YFormField, YInput } from '@y-ui/vue'
</script>

<template>
  <YFormField label="Email" error="Email is required" required>
    <YInput placeholder="you@example.com" />
  </YFormField>
</template>
```

```tsx [React]
import { YFormField, YInput } from '@y-ui/react'

function Example() {
  return (
    <YFormField label="Email" error="Email is required" required>
      <YInput placeholder="you@example.com" />
    </YFormField>
  )
}
```

```svelte [Svelte]
<script>
  import { YFormField, YInput } from '@y-ui/svelte'
</script>

<YFormField label="Email" error="Email is required" required>
  <YInput placeholder="you@example.com" />
</YFormField>
```

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Field label text |
| `name` | `string` | `''` | Field name (used for ID generation) |
| `error` | `string` | `undefined` | Error message (shows error styling) |
| `hint` | `string` | `undefined` | Helper text below the field |
| `required` | `boolean` | `false` | Shows required indicator |
| `disabled` | `boolean` | `false` | Disables the field |

## Form Library Integration

FormField works with form libraries via the adapter packages:

- **React**: `@y-ui/form-react` (react-hook-form adapter)
- **Vue**: `@y-ui/form-vue` (vee-validate adapter)

See the [Forms guide](/forms/react-hook-form) for details.
