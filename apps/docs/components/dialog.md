# Dialog

Modal dialog with overlay, header, body, and footer sections.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YDialog } from '@y-ui/vue'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Dialog</button>
  <YDialog v-model="open" title="Confirm Action">
    <p>Are you sure you want to proceed?</p>
    <template #footer>
      <button @click="open = false">Cancel</button>
      <button @click="open = false">Confirm</button>
    </template>
  </YDialog>
</template>
```

```tsx [React]
import { YDialog, useDialog } from '@y-ui/react'

function Example() {
  const { isOpen, open, close } = useDialog()

  return (
    <>
      <button onClick={open}>Open Dialog</button>
      <YDialog isOpen={isOpen} onClose={close} title="Confirm Action">
        <p>Are you sure you want to proceed?</p>
        <YDialog.Footer>
          <button onClick={close}>Cancel</button>
          <button onClick={close}>Confirm</button>
        </YDialog.Footer>
      </YDialog>
    </>
  )
}
```

```svelte [Svelte]
<script>
  import { YDialog } from '@y-ui/svelte'

  let open = false
</script>

<button on:click={() => open = true}>Open Dialog</button>
<YDialog bind:open title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <svelte:fragment slot="footer">
    <button on:click={() => open = false}>Cancel</button>
    <button on:click={() => open = false}>Confirm</button>
  </svelte:fragment>
</YDialog>
```

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` / `modelValue` | `boolean` | `false` | Controls visibility |
| `title` | `string` | `''` | Dialog title |
| `closable` | `boolean` | `true` | Shows close button |
| `closeOnOverlay` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | — | Fired when dialog closes |
