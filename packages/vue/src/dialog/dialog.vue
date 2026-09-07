<script setup lang="ts">
import { watch, onBeforeUnmount, ref, computed } from 'vue'
import { YIcon } from '../icon'

export interface DialogProps {
  open?: boolean
  title?: string
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
  width?: string | number
  footer?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
  closable: true,
  mask: true,
  maskClosable: true,
  footer: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
}>()

const previousFocus = ref<HTMLElement | null>(null)

function handleClose() {
  emit('update:open', false)
  emit('close')
}

function handleOverlayClick() {
  if (props.maskClosable && props.mask) handleClose()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closable) handleClose()
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    previousFocus.value = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
    if (previousFocus.value) previousFocus.value.focus()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

const dialogStyle = computed(() => {
  if (props.width == null) return {}
  return { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
})
</script>

<template>
  <div v-if="open" class="y-dialog-overlay" @click="handleOverlayClick">
    <div v-if="mask !== false" class="y-dialog-mask" />
    <div
      class="y-dialog"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? 'y-dialog-title' : undefined"
      :style="dialogStyle"
      @click.stop
    >
      <div v-if="title || closable" class="y-dialog__header">
        <h2 v-if="title" id="y-dialog-title" class="y-dialog__title">{{ title }}</h2>
        <button
          v-if="closable"
          type="button"
          class="y-dialog__close"
          aria-label="Close"
          @click="handleClose"
        >
          <YIcon name="x" :size="16" />
        </button>
      </div>
      <div class="y-dialog__body">
        <slot />
      </div>
      <div v-if="footer || $slots.footer" class="y-dialog__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
