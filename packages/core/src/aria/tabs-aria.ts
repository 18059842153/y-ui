import type { TabsState, TabsContext } from '../machines/tabs.js'

export function tabsAriaAttributes(state: TabsState, context: TabsContext) {
  const baseId = context.id || 'y-tabs'

  return {
    tablist: {
      role: 'tablist' as const,
      'aria-orientation': context.orientation || 'horizontal',
    },
    tab: (index: number) => ({
      role: 'tab' as const,
      id: `${baseId}-tab-${index}`,
      'aria-selected': state.activeIndex === index,
      'aria-controls': `${baseId}-panel-${index}`,
      tabindex: state.activeIndex === index ? 0 : -1,
    }),
    panel: (index: number) => ({
      role: 'tabpanel' as const,
      id: `${baseId}-panel-${index}`,
      'aria-labelledby': `${baseId}-tab-${index}`,
      tabindex: 0,
      hidden: state.activeIndex !== index,
    }),
  }
}
