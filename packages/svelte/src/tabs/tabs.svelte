<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  interface TabItem {
    key: string
    label: string
    disabled?: boolean
    closable?: boolean
  }

  interface Props {
    items: TabItem[]
    activeKey?: string
    defaultActiveKey?: string
    type?: 'line' | 'card' | 'segment'
    size?: 'sm' | 'md' | 'lg'
  }

  export let items: Props['items'] = []
  export let activeKey: Props['activeKey'] = undefined
  export let defaultActiveKey: Props['defaultActiveKey'] = undefined
  export let type: Props['type'] = 'line'
  export let size: Props['size'] = 'md'

  const dispatch = createEventDispatcher<{ change: string }>()

  let internalKey = defaultActiveKey ?? items[0]?.key ?? ''

  $: isControlled = activeKey !== undefined
  $: currentKey = isControlled ? activeKey : internalKey

  $: classes = `y-tabs y-tabs--${type} y-tabs--${size}`

  function handleSelect(key: string) {
    if (!isControlled) internalKey = key
    dispatch('change', key)
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    const enabledItems = items.filter((item) => !item.disabled)
    const enabledIndex = enabledItems.findIndex((item) => item.key === items[index].key)

    let nextItem: TabItem | undefined

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        nextItem = enabledItems[(enabledIndex + 1) % enabledItems.length]
        break
      case 'ArrowLeft':
        e.preventDefault()
        nextItem = enabledItems[(enabledIndex - 1 + enabledItems.length) % enabledItems.length]
        break
      case 'Home':
        e.preventDefault()
        nextItem = enabledItems[0]
        break
      case 'End':
        e.preventDefault()
        nextItem = enabledItems[enabledItems.length - 1]
        break
    }

    if (nextItem) {
      handleSelect(nextItem.key)
      const tabEl = (e.currentTarget.parentElement?.children[index] as HTMLElement)
      tabEl?.focus()
    }
  }
</script>

<div class={classes}>
  <div class="y-tabs__nav" role="tablist">
    {#each items as item, index}
      <button
        type="button"
        role="tab"
        class="y-tabs__tab {currentKey === item.key ? 'y-tabs__tab--active' : ''}"
        aria-selected={currentKey === item.key}
        disabled={item.disabled}
        tabindex={currentKey === item.key ? 0 : -1}
        on:click={() => !item.disabled && handleSelect(item.key)}
        on:keydown={(e) => handleKeydown(e, index)}
      >
        {item.label}
      </button>
    {/each}
  </div>
  <div class="y-tabs__content">
    <slot />
  </div>
</div>
