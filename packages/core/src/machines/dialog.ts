export type DialogState =
  | { type: 'closed' }
  | { type: 'open' }

export type DialogEvent =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }

export interface DialogContext {
  id: string
  modal?: boolean
}

export function dialogTransition(
  state: DialogState,
  event: DialogEvent,
): DialogState {
  switch (event.type) {
    case 'OPEN':
      return { type: 'open' }
    case 'CLOSE':
      return { type: 'closed' }
    case 'TOGGLE':
      return state.type === 'open' ? { type: 'closed' } : { type: 'open' }
    default:
      return state
  }
}
