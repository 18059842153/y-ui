import type { TabsState, TabsEvent, TabsContext } from '@y-ui/core'

export interface UseTabsConfig {
  defaultIndex?: number
  onChange?: (index: number) => void
  id?: string
  orientation?: 'horizontal' | 'vertical'
}

export interface UseTabsReturn {
  state: TabsState
  activeIndex: number
  tablistProps: Record<string, unknown>
  getTabProps: (index: number) => Record<string, unknown>
  getPanelProps: (index: number) => Record<string, unknown>
  selectTab: (index: number) => void
  dispatch: (event: TabsEvent) => void
}

export type UseTabsHook = (config: UseTabsConfig) => UseTabsReturn
