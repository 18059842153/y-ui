import { Show, Slot } from '@builder.io/mitosis'
import type { ButtonProps } from './types'

export default function YButton(props: ButtonProps) {
  return (
    <button
      type={props.htmlType || 'button'}
      disabled={props.disabled || props.loading}
      aria-disabled={props.disabled || props.loading || undefined}
      aria-busy={props.loading || undefined}
      class={`y-btn y-btn--${props.variant || 'primary'} y-btn--${props.size || 'md'} ${props.block ? 'y-btn--block' : ''}`}
    >
      <Show when={props.loading}>
        <span aria-hidden="true" class="y-btn__spinner" />
        <span class="sr-only">{props.loadingText || 'Loading'}</span>
      </Show>
      <span class="y-btn__label">
        <Slot />
      </span>
    </button>
  )
}
