<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  interface Props {
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
    value?: string
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

  export let type: Props['type'] = 'text'
  export let value: Props['value'] = undefined
  export let placeholder: Props['placeholder'] = undefined
  export let disabled: Props['disabled'] = false
  export let readonly: Props['readonly'] = false
  export let size: Props['size'] = 'md'
  export let error: Props['error'] = false
  export let clearable: Props['clearable'] = false
  export let name: Props['name'] = undefined
  export let maxLength: Props['maxLength'] = undefined
  export let autoComplete: Props['autoComplete'] = undefined

  const dispatch = createEventDispatcher<{ change: string; focus: FocusEvent; blur: FocusEvent }>()

  let internalValue = ''
  $: isControlled = value !== undefined
  $: currentValue = isControlled ? value : internalValue

  $: wrapperClasses = [
    'y-input-wrapper',
    error ? 'y-input-wrapper--error' : '',
    disabled ? 'y-input-wrapper--disabled' : '',
  ].filter(Boolean).join(' ')

  function handleInput(e: Event) {
    const newValue = (e.target as HTMLInputElement).value
    if (!isControlled) internalValue = newValue
    dispatch('change', newValue)
  }

  function handleClear() {
    if (!isControlled) internalValue = ''
    dispatch('change', '')
  }
</script>

<div class={wrapperClasses}>
  {#if $$slots.prefix}
    <span class="y-input__prefix">
      <slot name="prefix" />
    </span>
  {/if}
  <input
    {type}
    value={currentValue}
    {placeholder}
    {disabled}
    {readonly}
    {name}
    maxlength={maxLength}
    autocomplete={autoComplete}
    class="y-input y-input--{size}"
    aria-invalid={error || undefined}
    on:input={handleInput}
    on:focus={(e) => dispatch('focus', e)}
    on:blur={(e) => dispatch('blur', e)}
  />
  {#if clearable && currentValue && !disabled && !readonly}
    <button
      type="button"
      class="y-input__suffix cursor-pointer"
      aria-label="Clear"
      on:click={handleClear}
    >
      ×
    </button>
  {/if}
  {#if $$slots.suffix}
    <span class="y-input__suffix">
      <slot name="suffix" />
    </span>
  {/if}
</div>
