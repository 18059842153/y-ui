import type { IconProps } from './types'

export default function YIcon(props: IconProps) {
  const {
    name,
    size = 24,
    color = 'currentColor',
    strokeWidth,
    title,
    ariaHidden = !title,
  } = props

  return (
    <svg
      class={`y-icon ${props.class || ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width={strokeWidth || 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden={ariaHidden}
      role={title ? 'img' : undefined}
    >
      <Show when={title}>
        <title>{title}</title>
      </Show>
    </svg>
  )
}
