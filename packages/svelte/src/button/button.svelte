<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    loadingText?: string
    block?: boolean
    htmlType?: 'button' | 'submit' | 'reset'
    icon?: string
    onclick?: (e: MouseEvent) => void
  }

  export let variant: Props['variant'] = 'primary'
  export let size: Props['size'] = 'md'
  export let disabled: Props['disabled'] = false
  export let loading: Props['loading'] = false
  export let loadingText: Props['loadingText'] = 'Loading'
  export let block: Props['block'] = false
  export let htmlType: Props['htmlType'] = 'button'
  export let onclick: Props['onclick'] = undefined

  $: isDisabled = disabled || loading
  $: classes = ['y-btn', `y-btn--${variant}`, `y-btn--${size}`, block ? 'y-btn--block' : '']
    .filter(Boolean)
    .join(' ')
</script>

<button
  type={htmlType}
  disabled={isDisabled}
  aria-disabled={isDisabled || undefined}
  aria-busy={loading || undefined}
  class={classes}
  on:click={onclick}
>
  {#if loading}
    <span aria-hidden="true" class="y-btn__spinner" />
    <span class="sr-only">{loadingText}</span>
  {/if}
  <span class="y-btn__label">
    <slot />
  </span>
</button>
