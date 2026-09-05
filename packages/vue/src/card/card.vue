<script setup lang="ts">
import { computed } from 'vue'

export interface CardProps {
  title?: string
  bordered?: boolean
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  bordered: true,
  hoverable: false,
  size: 'md',
  loading: false,
})

const classes = computed(() =>
  [
    'y-card',
    `y-card--${props.size}`,
    props.bordered ? 'y-card--bordered' : '',
    props.hoverable ? 'y-card--hoverable' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.cover" class="y-card__cover">
      <slot name="cover" />
    </div>
    <div v-if="title || $slots.extra" class="y-card__header">
      <h3 v-if="title" class="y-card__title">{{ title }}</h3>
      <div v-if="$slots.extra" class="y-card__extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="y-card__body">
      <div v-if="loading" class="y-card__loading">
        <span class="y-card__loading-dot" />
        <span class="y-card__loading-dot" />
        <span class="y-card__loading-dot" />
      </div>
      <slot v-else />
    </div>
  </div>
</template>
