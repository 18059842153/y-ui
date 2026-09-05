<script lang="ts">
  interface Props {
    title?: string
    bordered?: boolean
    hoverable?: boolean
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
  }

  export let title: Props['title'] = undefined
  export let bordered: Props['bordered'] = true
  export let hoverable: Props['hoverable'] = false
  export let size: Props['size'] = 'md'
  export let loading: Props['loading'] = false

  $: classes = [
    'y-card',
    `y-card--${size}`,
    bordered ? 'y-card--bordered' : '',
    hoverable ? 'y-card--hoverable' : '',
  ]
    .filter(Boolean)
    .join(' ')
</script>

<div class={classes}>
  {#if $$slots.cover}
    <div class="y-card__cover">
      <slot name="cover" />
    </div>
  {/if}
  {#if title || $$slots.extra}
    <div class="y-card__header">
      {#if title}
        <h3 class="y-card__title">{title}</h3>
      {/if}
      {#if $$slots.extra}
        <div class="y-card__extra">
          <slot name="extra" />
        </div>
      {/if}
    </div>
  {/if}
  <div class="y-card__body">
    {#if loading}
      <div class="y-card__loading">
        <span class="y-card__loading-dot" />
        <span class="y-card__loading-dot" />
        <span class="y-card__loading-dot" />
      </div>
    {:else}
      <slot />
    {/if}
  </div>
</div>
