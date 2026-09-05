<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  loadingText: 'Loading',
  block: false,
  htmlType: 'button',
})

const isDisabled = computed(() => props.disabled || props.loading)

const classes = computed(() =>
  [
    'y-btn',
    `y-btn--${props.variant}`,
    `y-btn--${props.size}`,
    props.block ? 'y-btn--block' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <button
    :type="htmlType"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :class="classes"
  >
    <template v-if="loading">
      <span aria-hidden="true" class="y-btn__spinner" />
      <span class="sr-only">{{ loadingText }}</span>
    </template>
    <span class="y-btn__label">
      <slot />
    </span>
  </button>
</template>
