export interface TabsProps {
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
  type?: 'line' | 'card' | 'segment'
  size?: 'sm' | 'md' | 'lg'
}

export interface TabItem {
  key: string
  label: string
  disabled?: boolean
  closable?: boolean
}
