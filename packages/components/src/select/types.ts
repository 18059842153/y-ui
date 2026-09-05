export interface SelectProps<T = any> {
  options: T[]
  value?: T
  defaultValue?: T
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  multiple?: boolean
  onChange?: (value: T) => void
  getLabel?: (option: T) => string
  getValue?: (option: T) => string
}
