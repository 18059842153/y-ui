export interface ValidationRule {
  required?: boolean | string
  min?: number | string
  max?: number | string
  pattern?: RegExp | { value: RegExp; message: string }
  validate?: (value: any) => boolean | string | Promise<boolean | string>
}

export interface FieldState {
  value: any
  error: string | undefined
  touched: boolean
  dirty: boolean
}

export interface FieldAriaProps {
  id: string
  'aria-invalid': boolean
  'aria-describedby': string | undefined
  'aria-required': boolean | undefined
}

export interface FormFieldAdapter<T = any> {
  name: string
  value: T
  error: string | undefined
  onChange: (value: T) => void
  onBlur: () => void
  ref?: (el: HTMLElement | null) => void
}
