# Tabs

Tab navigation with line, card, and segment variants.

## Usage

::: code-group

```vue [Vue]
<script setup>
import { YTabs } from '@y-ui/vue'
import { ref } from 'vue'

const activeTab = ref('tab1')
const tabs = [
  { key: 'tab1', label: 'Tab 1' },
  { key: 'tab2', label: 'Tab 2' },
  { key: 'tab3', label: 'Tab 3' },
]
</script>

<template>
  <YTabs v-model="activeTab" :tabs="tabs">
    <template #tab1>Content for Tab 1</template>
    <template #tab2>Content for Tab 2</template>
    <template #tab3>Content for Tab 3</template>
  </YTabs>
</template>
```

```tsx [React]
import { YTabs, useTabs } from '@y-ui/react'

function Example() {
  const tabs = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ]
  const { activeKey, setActiveKey } = useTabs({ defaultKey: 'tab1' })

  return (
    <YTabs activeKey={activeKey} onChange={setActiveKey} tabs={tabs}>
      {activeKey === 'tab1' && <div>Content for Tab 1</div>}
      {activeKey === 'tab2' && <div>Content for Tab 2</div>}
      {activeKey === 'tab3' && <div>Content for Tab 3</div>}
    </YTabs>
  )
}
```

```svelte [Svelte]
<script>
  import { YTabs } from '@y-ui/svelte'

  const tabs = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ]
  let activeKey = 'tab1'
</script>

<YTabs bind:activeKey {tabs}>
  {#if activeKey === 'tab1'}<div>Content for Tab 1</div>{/if}
  {#if activeKey === 'tab2'}<div>Content for Tab 2</div>{/if}
  {#if activeKey === 'tab3'}<div>Content for Tab 3</div>{/if}
</YTabs>
```

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeKey` / `modelValue` | `string` | — | Active tab key |
| `tabs` | `Array<{ key: string; label: string; disabled?: boolean }>` | `[]` | Tab definitions |
| `variant` | `'line' \| 'card' \| 'segment'` | `'line'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab size |
