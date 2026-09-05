<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export interface SelectProps<T = any> {
  options: T[]
  modelValue?: T
  defaultValue?: T
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  getLabel?: (option: T) => string
  getValue?: (option: T) => string
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'Select...',
  disabled: false,
  size: 'md',
  error: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const internalValue = ref(props.defaultValue)
const triggerRef = ref<HTMLButtonElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const isControlled = computed(() => props.modelValue !== undefined)
const currentValue = computed(() => isControlled.value ? props.modelValue : internalValue.value)

function getLabelFor(opt: any): string {
  return props.getLabel ? props.getLabel(opt) : String(opt)
}

function handleSelect(opt: any) {
  if (!isControlled.value) internalValue.value = opt
  emit('update:modelValue', opt)
  emit('change', opt)
  isOpen.value = false
  triggerRef.value?.focus()
}

function handleToggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        highlightedIndex.value = 0
      } else {
        highlightedIndex.value = highlightedIndex.value < props.options.length - 1
          ? highlightedIndex.value + 1 : 0
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        highlightedIndex.value = props.options.length - 1
      } else {
        highlightedIndex.value = highlightedIndex.value > 0
          ? highlightedIndex.value - 1 : props.options.length - 1
      }
      break
    case 'Enter':
      e.preventDefault()
      if (isOpen.value && highlightedIndex.value >= 0) {
        handleSelect(props.options[highlightedIndex.value])
      } else {
        isOpen.value = true
      }
      break
    case 'Escape':
      e.preventDefault()
      isOpen.value = false
      break
    case 'Home':
      if (isOpen.value) { e.preventDefault(); highlightedIndex.value = 0 }
      break
    case 'End':
      if (isOpen.value) { e.preventDefault(); highlightedIndex.value = props.options.length - 1 }
      break
  }
}

function handleClickOutside(e: MouseEvent) {
  if (!containerRef.value?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))

watch(isOpen, (val) => { if (!val) highlightedIndex.value = -1 })

const selectedLabel = computed(() =>
  currentValue.value != null ? getLabelFor(currentValue.value) : null,
)

const classes = computed(() =>
  [
    'y-select',
    props.disabled ? 'y-select--disabled' : '',
    props.error ? 'y-select--error' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <div ref="containerRef" :class="classes" @keydown="handleKeydown">
    <button
      ref="triggerRef"
      type="button"
      :class="`y-select__trigger y-input y-input--${size}`"
      :disabled="disabled"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="handleToggle"
    >
      <span class="y-select__value">
        <span v-if="selectedLabel != null">{{ selectedLabel }}</span>
        <span v-else class="y-select__placeholder">{{ placeholder }}</span>
      </span>
      <span class="y-select__arrow" aria-hidden="true">▾</span>
    </button>
    <div v-if="isOpen" class="y-select__dropdown" role="listbox">
      <div
        v-for="(option, index) in options"
        :key="getValue ? getValue(option) : index"
        role="option"
        :aria-selected="currentValue === option"
        :class="[
          'y-select__option',
          highlightedIndex === index ? 'y-select__option--active' : '',
        ]"
        @click="handleSelect(option)"
        @mouseenter="highlightedIndex = index"
      >
        {{ getLabelFor(option) }}
      </div>
    </div>
  </div>
</template>
