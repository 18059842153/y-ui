<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import { YIcon } from '../icon'

  interface Props<T = any> {
    options: T[]
    value?: T
    placeholder?: string
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    error?: boolean
    getLabel?: (option: T) => string
  }

  export let options: Props['options'] = []
  export let value: Props['value'] = undefined
  export let placeholder: Props['placeholder'] = 'Select...'
  export let disabled: Props['disabled'] = false
  export let size: Props['size'] = 'md'
  export let error: Props['error'] = false
  export let getLabel: Props['getLabel'] = undefined

  const dispatch = createEventDispatcher<{ change: any }>()

  let isOpen = false
  let highlightedIndex = -1
  let internalValue: any = undefined
  let triggerEl: HTMLButtonElement
  let containerEl: HTMLDivElement

  $: isControlled = value !== undefined
  $: currentValue = isControlled ? value : internalValue

  $: selectedLabel = currentValue != null ? getLabelFor(currentValue) : null

  $: classes = [
    'y-select',
    disabled ? 'y-select--disabled' : '',
    error ? 'y-select--error' : '',
  ].filter(Boolean).join(' ')

  function getLabelFor(opt: any): string {
    return getLabel ? getLabel(opt) : String(opt)
  }

  function handleSelect(opt: any) {
    if (!isControlled) internalValue = opt
    dispatch('change', opt)
    isOpen = false
    triggerEl?.focus()
  }

  function handleToggle() {
    if (disabled) return
    isOpen = !isOpen
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          isOpen = true
          highlightedIndex = 0
        } else {
          highlightedIndex = highlightedIndex < options.length - 1 ? highlightedIndex + 1 : 0
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          isOpen = true
          highlightedIndex = options.length - 1
        } else {
          highlightedIndex = highlightedIndex > 0 ? highlightedIndex - 1 : options.length - 1
        }
        break
      case 'Enter':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex])
        } else {
          isOpen = true
        }
        break
      case 'Escape':
        e.preventDefault()
        isOpen = false
        break
      case 'Home':
        if (isOpen) { e.preventDefault(); highlightedIndex = 0 }
        break
      case 'End':
        if (isOpen) { e.preventDefault(); highlightedIndex = options.length - 1 }
        break
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (!containerEl?.contains(e.target as Node)) {
      isOpen = false
    }
  }

  $: if (!isOpen) highlightedIndex = -1

  onMount(() => document.addEventListener('mousedown', handleClickOutside))
  onDestroy(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<svelte:window on:keydown={handleKeydown} />

<div bind:this={containerEl} class={classes}>
  <button
    bind:this={triggerEl}
    type="button"
    class="y-select__trigger y-input y-input--{size}"
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    on:click={handleToggle}
  >
    <span class="y-select__value">
      {#if selectedLabel != null}
        <span>{selectedLabel}</span>
      {:else}
        <span class="y-select__placeholder">{placeholder}</span>
      {/if}
    </span>
    <span class="y-select__arrow" aria-hidden="true"><YIcon name="chevron-down" size={16} /></span>
  </button>
  {#if isOpen}
    <div class="y-select__dropdown" role="listbox">
      {#each options as option, index}
        <div
          role="option"
          aria-selected={currentValue === option}
          tabindex="-1"
          class="y-select__option {highlightedIndex === index ? 'y-select__option--active' : ''}"
          on:click={() => handleSelect(option)}
          on:keydown={(e) => e.key === 'Enter' && handleSelect(option)}
          on:mouseenter={() => (highlightedIndex = index)}
        >
          {getLabelFor(option)}
        </div>
      {/each}
    </div>
  {/if}
</div>
