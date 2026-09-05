<script setup lang="ts">
import { ref, computed } from 'vue'

export interface TabItem {
  key: string
  label: string
  disabled?: boolean
  closable?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  type?: 'line' | 'card' | 'segment'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<TabsProps>(), {
  type: 'line',
  size: 'md',
})

const emit = defineEmits<{
  'update:activeKey': [key: string]
  'change': [key: string]
}>()

const internalKey = ref(props.defaultActiveKey ?? props.items[0]?.key ?? '')
const isControlled = computed(() => props.activeKey !== undefined)
const currentKey = computed(() => isControlled.value ? props.activeKey! : internalKey.value)

function handleSelect(key: string) {
  if (!isControlled.value) internalKey.value = key
  emit('update:activeKey', key)
  emit('change', key)
}

function handleKeydown(e: KeyboardEvent, index: number) {
  const enabledItems = props.items.filter((item) => !item.disabled)
  const enabledIndex = enabledItems.findIndex((item) => item.key === props.items[index].key)

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
    const currentEl = e.currentTarget as HTMLElement
    const tabEl = (currentEl.parentElement?.children[index] as HTMLElement)
    tabEl?.focus()
  }
}

const classes = computed(() => `y-tabs y-tabs--${props.type} y-tabs--${props.size}`)
</script>

<template>
  <div :class="classes">
    <div class="y-tabs__nav" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="item.key"
        type="button"
        role="tab"
        :class="[
          'y-tabs__tab',
          currentKey === item.key ? 'y-tabs__tab--active' : '',
        ]"
        :aria-selected="currentKey === item.key"
        :disabled="item.disabled"
        :tabindex="currentKey === item.key ? 0 : -1"
        @click="!item.disabled && handleSelect(item.key)"
        @keydown="handleKeydown($event, index)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="y-tabs__content">
      <slot />
    </div>
  </div>
</template>
