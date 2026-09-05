export type SelectState =
  | { type: 'closed' }
  | { type: 'open'; highlightedIndex: number }

export type SelectEvent =
  | { type: 'TOGGLE' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'ARROW_DOWN' }
  | { type: 'ARROW_UP' }
  | { type: 'ENTER' }
  | { type: 'ESCAPE' }
  | { type: 'HOME' }
  | { type: 'END' }
  | { type: 'TYPEAHEAD'; char: string }

export interface SelectContext {
  options: unknown[]
  id: string
  label?: string
}

export function selectTransition(
  state: SelectState,
  event: SelectEvent,
  context: SelectContext,
): SelectState {
  const { options } = context
  const lastIndex = options.length - 1

  switch (state.type) {
    case 'closed':
      switch (event.type) {
        case 'TOGGLE':
        case 'OPEN':
        case 'ARROW_DOWN':
          return { type: 'open', highlightedIndex: 0 }
        case 'ARROW_UP':
          return { type: 'open', highlightedIndex: lastIndex }
        default:
          return state
      }

    case 'open':
      switch (event.type) {
        case 'ESCAPE':
        case 'CLOSE':
        case 'TOGGLE':
          return { type: 'closed' }

        case 'ARROW_DOWN':
          return {
            ...state,
            highlightedIndex: state.highlightedIndex < lastIndex
              ? state.highlightedIndex + 1
              : 0,
          }

        case 'ARROW_UP':
          return {
            ...state,
            highlightedIndex: state.highlightedIndex > 0
              ? state.highlightedIndex - 1
              : lastIndex,
          }

        case 'HOME':
          return { ...state, highlightedIndex: 0 }

        case 'END':
          return { ...state, highlightedIndex: lastIndex }

        case 'ENTER':
          return { type: 'closed' }

        default:
          return state
      }
  }
}
