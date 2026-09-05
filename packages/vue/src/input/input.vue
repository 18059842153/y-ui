<script setup lang="ts">
import { computed, ref } from 'vue'

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  modelValue?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  clearable?: boolean
  name?: string
  maxLength?: number
  autoComplete?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  size: 'md',
  error: false,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': [e: FocusEvent]
  'blur': [e: FocusEvent]
}>()

const internalValue = ref(props.defaultValue ?? '')
const isControlled = computed(() => props.modelValue !== undefined)
const currentValue = computed(() => isControlled.value ? props.modelValue! : internalValue.value)

function handleChange(e: Event) {
  const newValue = (e.target as HTMLInputElement).value
  if (!isControlled.value) internalValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

function handleClear() {
  if (!isControlled.value) internalValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
}

const wrapperClasses = computed(() =>
  [
    'y-input-wrapper',
    props.error ? 'y-input-wrapper--error' : '',
    props.disabled ? 'y-input-wrapper--disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <div :class="wrapperClasses">
    <span v-if="$slots.prefix" class="y-input__prefix">
      <slot name="prefix" />
    </span>
    <input
      :type="type"
      :value="currentValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      :maxlength="maxLength"
      :autocomplete="autoComplete"
      :class="`y-input y-input--${size}`"
      :aria-invalid="error || undefined"
      @input="handleChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <button
      v-if="clearable && currentValue && !disabled && !readonly"
      type="button"
      class="y-input__suffix cursor-pointer"
      aria-label="Clear"
      @click="handleClear"
    >
      ×
    </button>
    <span v-if="$slots.suffix" class="y-input__suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>
