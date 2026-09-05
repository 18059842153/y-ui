export type TabsState = {
  activeIndex: number
}

export type TabsEvent =
  | { type: 'SELECT'; index: number }
  | { type: 'ARROW_LEFT'; total: number }
  | { type: 'ARROW_RIGHT'; total: number }
  | { type: 'HOME' }
  | { type: 'END'; total: number }

export interface TabsContext {
  id: string
  orientation?: 'horizontal' | 'vertical'
}

export function tabsTransition(
  state: TabsState,
  event: TabsEvent,
): TabsState {
  switch (event.type) {
    case 'SELECT':
      return { activeIndex: event.index }

    case 'ARROW_RIGHT':
      return { activeIndex: (state.activeIndex + 1) % event.total }

    case 'ARROW_LEFT':
      return { activeIndex: (state.activeIndex - 1 + event.total) % event.total }

    case 'HOME':
      return { activeIndex: 0 }

    case 'END':
      return { activeIndex: event.total - 1 }

    default:
      return state
  }
}
