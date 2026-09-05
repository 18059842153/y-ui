import type { DialogState, DialogContext } from '../machines/dialog.js'

export function dialogAriaAttributes(state: DialogState, context: DialogContext) {
  const baseId = context.id || 'y-dialog'

  return {
    dialog: {
      role: context.modal !== false ? 'dialog' as const : undefined,
      'aria-modal': context.modal !== false ? state.type === 'open' : undefined,
      'aria-labelledby': `${baseId}-title`,
      id: baseId,
    },
    title: {
      id: `${baseId}-title`,
    },
    closeButton: {
      'aria-label': 'Close',
    },
  }
}
