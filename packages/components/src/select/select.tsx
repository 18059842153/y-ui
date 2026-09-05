import { Show, For, Slot } from '@builder.io/mitosis'
import type { SelectProps } from './types'

export default function YSelect(props: SelectProps) {
  return (
    <div class={`y-select ${props.disabled ? 'y-select--disabled' : ''} ${props.error ? 'y-select--error' : ''}`}>
      <button
        type="button"
        class={`y-select__trigger y-input y-input--${props.size || 'md'}`}
        disabled={props.disabled}
        aria-haspopup="listbox"
      >
        <span class="y-select__value">
          <Show when={props.value} fallback={<span class="y-select__placeholder">{props.placeholder || 'Select...'}</span>}>
            <span>{props.getLabel?.(props.value) || String(props.value)}</span>
          </Show>
        </span>
        <span class="y-select__arrow" aria-hidden="true">
          <Slot name="arrow" />
        </span>
      </button>
      <div class="y-select__dropdown" role="listbox">
        <For each={props.options}>
          {(option, index) => (
            <div
              role="option"
              class="y-select__option"
              onClick={() => props.onChange?.(option)}
            >
              {props.getLabel?.(option) || String(option)}
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
