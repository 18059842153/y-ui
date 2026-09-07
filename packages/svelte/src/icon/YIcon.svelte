<script lang="ts">
  import { getIcon } from '@y-ui/icons'
  import type { IconData } from '@y-ui/icons'

  export let name: string
  export let size: number | string = 24
  export let color: string = 'currentColor'
  export let strokeWidth: number | undefined = undefined
  export let title: string | undefined = undefined
  export let ariaHidden: boolean | undefined = undefined

  $: icon = getIcon(name) as IconData | undefined
  $: isHidden = ariaHidden ?? !title
  $: sw = strokeWidth ?? icon?.defaultStrokeWidth ?? 2
</script>

{#if icon}
  <svg
    class="y-icon"
    width={size}
    height={size}
    viewBox={icon.viewBox}
    fill="none"
    stroke={color}
    stroke-width={sw}
    stroke-linecap={icon.strokeLinecap || 'round'}
    stroke-linejoin={icon.strokeLinejoin || 'round'}
    aria-hidden={isHidden}
    role={title ? 'img' : undefined}
  >
    {#if title}
      <title>{title}</title>
    {/if}
    {#each icon.paths as d, i}
      <path {d} />
    {/each}
  </svg>
{/if}
