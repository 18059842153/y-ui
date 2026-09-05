import { Show, Slot } from '@builder.io/mitosis'
import type { InputProps } from './types'

export default function YInput(props: InputProps) {
  return (
    <div class={`y-input-wrapper ${props.error ? 'y-input-wrapper--error' : ''} ${props.disabled ? 'y-input-wrapper--disabled' : ''}`}>
      <Show when={props.prefix}>
        <span class="y-input__prefix">
          <Slot name="prefix" />
        </span>
      </Show>
      <input
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readonly}
        name={props.name}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        class={`y-input y-input--${props.size || 'md'}`}
        aria-invalid={props.error || undefined}
        onChange={(e) => props.onChange?.((e.target as HTMLInputElement).value)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      <Show when={props.suffix}>
        <span class="y-input__suffix">
          <Slot name="suffix" />
        </span>
      </Show>
    </div>
  )
}
