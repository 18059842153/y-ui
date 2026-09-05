<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'

  interface Props {
    open?: boolean
    title?: string
    closable?: boolean
    mask?: boolean
    maskClosable?: boolean
    width?: string | number
  }

  export let open: Props['open'] = false
  export let title: Props['title'] = undefined
  export let closable: Props['closable'] = true
  export let mask: Props['mask'] = true
  export let maskClosable: Props['maskClosable'] = true
  export let width: Props['width'] = undefined

  const dispatch = createEventDispatcher<{ close: void }>()

  let previousFocus: HTMLElement | null = null

  function handleClose() {
    dispatch('close')
  }

  function handleOverlayClick() {
    if (maskClosable && mask) handleClose()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closable) handleClose()
  }

  $: if (open) {
    previousFocus = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
    if (previousFocus) previousFocus.focus()
  }

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })

  $: dialogStyle = width != null
    ? `width: ${typeof width === 'number' ? `${width}px` : width}`
    : ''
</script>

{#if open}
  <div class="y-dialog-overlay" on:click={handleOverlayClick} role="presentation">
    {#if mask}
      <div class="y-dialog-mask" />
    {/if}
    <div
      class="y-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'y-dialog-title' : undefined}
      style={dialogStyle}
      on:click|stopPropagation
    >
      {#if title || closable}
        <div class="y-dialog__header">
          {#if title}
            <h2 id="y-dialog-title" class="y-dialog__title">{title}</h2>
          {/if}
          {#if closable}
            <button
              type="button"
              class="y-dialog__close"
              aria-label="Close"
              on:click={handleClose}
            >
              ×
            </button>
          {/if}
        </div>
      {/if}
      <div class="y-dialog__body">
        <slot />
      </div>
      {#if $$slots.footer}
        <div class="y-dialog__footer">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}
