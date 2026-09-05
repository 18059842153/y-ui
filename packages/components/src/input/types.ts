export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  prefix?: any
  suffix?: any
  clearable?: boolean
  name?: string
  maxLength?: number
  autoComplete?: string
  onChange?: (value: string) => void
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
}
