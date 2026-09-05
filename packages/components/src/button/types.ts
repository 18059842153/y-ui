export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: string
  children?: any
}
