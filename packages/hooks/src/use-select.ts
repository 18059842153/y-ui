import type { SelectState, SelectEvent, SelectContext } from '@y-ui/core'

export interface UseSelectConfig<T> {
  options: T[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  id?: string
  label?: string
}

export interface UseSelectReturn {
  state: SelectState
  isOpen: boolean
  highlightedIndex: number
  triggerProps: Record<string, unknown>
  listboxProps: Record<string, unknown>
  getOptionProps: (index: number) => Record<string, unknown>
  dispatch: (event: SelectEvent) => void
}

export type UseSelectHook = <T>(config: UseSelectConfig<T>) => UseSelectReturn
