import { Show, Slot } from '@builder.io/mitosis'
import type { CardProps } from './types'

export default function YCard(props: CardProps) {
  return (
    <div class={`y-card ${props.bordered !== false ? 'y-card--bordered' : ''} ${props.hoverable ? 'y-card--hoverable' : ''} y-card--${props.size || 'md'}`}>
      <Show when={props.cover}>
        <div class="y-card__cover">
          <Slot name="cover" />
        </div>
      </Show>
      <Show when={props.title || props.extra}>
        <div class="y-card__header">
          <Show when={props.title}>
            <h3 class="y-card__title">{props.title}</h3>
          </Show>
          <Show when={props.extra}>
            <div class="y-card__extra">
              <Slot name="extra" />
            </div>
          </Show>
        </div>
      </Show>
      <div class="y-card__body">
        <Show when={props.loading} fallback={<Slot />}>
          <div class="y-card__loading">
            <span class="y-card__loading-dot" />
            <span class="y-card__loading-dot" />
            <span class="y-card__loading-dot" />
          </div>
        </Show>
      </div>
    </div>
  )
}
