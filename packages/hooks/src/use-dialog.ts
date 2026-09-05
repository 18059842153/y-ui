import type { DialogState, DialogEvent, DialogContext } from '@y-ui/core'

export interface UseDialogConfig {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  id?: string
  modal?: boolean
}

export interface UseDialogReturn {
  state: DialogState
  isOpen: boolean
  dialogProps: Record<string, unknown>
  titleProps: Record<string, unknown>
  closeButtonProps: Record<string, unknown>
  open: () => void
  close: () => void
  toggle: () => void
  dispatch: (event: DialogEvent) => void
}

export type UseDialogHook = (config: UseDialogConfig) => UseDialogReturn
