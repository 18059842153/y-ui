import { For, Slot } from '@builder.io/mitosis'
import type { TabsProps, TabItem } from './types'

export default function YTabs(props: TabsProps & { items: TabItem[] }) {
  return (
    <div class={`y-tabs y-tabs--${props.type || 'line'} y-tabs--${props.size || 'md'}`}>
      <div class="y-tabs__nav" role="tablist">
        <For each={props.items}>
          {(item) => (
            <button
              type="button"
              role="tab"
              class={`y-tabs__tab ${props.activeKey === item.key ? 'y-tabs__tab--active' : ''}`}
              aria-selected={props.activeKey === item.key}
              disabled={item.disabled}
              onClick={() => !item.disabled && props.onChange?.(item.key)}
            >
              {item.label}
            </button>
          )}
        </For>
      </div>
      <div class="y-tabs__content">
        <Slot />
      </div>
    </div>
  )
}
