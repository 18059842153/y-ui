<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '@y-ui/icons'

export interface IconProps {
  name: string
  size?: number | string
  color?: string
  strokeWidth?: number
  title?: string
  ariaHidden?: boolean
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: 'currentColor',
  ariaHidden: undefined,
})

const icon = computed(() => getIcon(props.name))
const isHidden = computed(() => props.ariaHidden ?? !props.title)
const sw = computed(() => props.strokeWidth ?? icon.value?.defaultStrokeWidth ?? 2)
</script>

<template>
  <svg
    v-if="icon"
    class="y-icon"
    :width="size"
    :height="size"
    :viewBox="icon.viewBox"
    fill="none"
    :stroke="color"
    :stroke-width="sw"
    :stroke-linecap="icon.strokeLinecap || 'round'"
    :stroke-linejoin="icon.strokeLinejoin || 'round'"
    :aria-hidden="isHidden"
    :role="title ? 'img' : undefined"
  >
    <title v-if="title">{{ title }}</title>
    <path v-for="(d, i) in icon.paths" :key="i" :d="d" />
  </svg>
</template>
