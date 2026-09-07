<script setup lang="ts">
import { computed } from 'vue'

export interface FormFieldProps {
  label?: string
  name: string
  error?: string
  required?: boolean
  hint?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<FormFieldProps>(), {
  required: false,
  disabled: false,
})

const fieldId = computed(() => `y-field-${props.name}`)
const errorId = computed(() => `${fieldId.value}-error`)

const classes = computed(() =>
  [
    'y-form-field',
    props.disabled ? 'y-form-field--disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <div :class="classes">
    <label v-if="label" :for="fieldId" class="y-form-field__label">
      {{ label }}
      <span v-if="required" class="y-form-field__required">*</span>
    </label>
    <slot />
    <span v-if="hint && !error" class="y-form-field__hint">{{ hint }}</span>
    <span v-if="error" :id="errorId" class="y-form-field__error" role="alert">
      {{ error }}
    </span>
  </div>
</template>
