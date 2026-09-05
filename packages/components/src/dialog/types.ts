export interface DialogProps {
  open?: boolean
  title?: string
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
  width?: string | number
  footer?: any
  onClose?: () => void
}
