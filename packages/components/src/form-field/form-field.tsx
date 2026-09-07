import { Show, Slot } from '@builder.io/mitosis'
import type { FormFieldProps } from './types'

export default function YFormField(props: FormFieldProps) {
  const fieldId = `y-field-${props.name}`
  const errorId = `${fieldId}-error`

  return (
    <div
      class={`y-form-field ${props.disabled ? 'y-form-field--disabled' : ''} ${props.class || ''}`}
    >
      <Show when={props.label}>
        <label for={fieldId} class="y-form-field__label">
          {props.label}
          <Show when={props.required}>
            <span class="y-form-field__required">*</span>
          </Show>
        </label>
      </Show>
      <Slot />
      <Show when={props.hint && !props.error}>
        <span class="y-form-field__hint">{props.hint}</span>
      </Show>
      <Show when={props.error}>
        <span id={errorId} class="y-form-field__error" role="alert">
          {props.error}
        </span>
      </Show>
    </div>
  )
}
