import { useState, useCallback, useMemo } from 'react'
import { tabsTransition } from '@y-ui/core'
import type { TabsState, TabsEvent } from '@y-ui/core'

export interface UseTabsConfig {
  defaultIndex?: number
  total?: number
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

export function useTabs(config: UseTabsConfig = {}): UseTabsReturn {
  const { defaultIndex = 0, total = 0, onChange, id = 'y-tabs', orientation = 'horizontal' } = config

  const [state, setState] = useState<TabsState>({ activeIndex: defaultIndex })

  const dispatch = useCallback(
    (event: TabsEvent) => {
      setState((prev) => {
        const next = tabsTransition(prev, event)
        if (event.type === 'SELECT' && next.activeIndex !== prev.activeIndex) {
          onChange?.(next.activeIndex)
        }
        return next
      })
    },
    [onChange],
  )

  const activeIndex = state.activeIndex

  const tablistProps = useMemo(
    () => ({
      role: 'tablist' as const,
      'aria-orientation': orientation,
    }),
    [orientation],
  )

  const getTabProps = useCallback(
    (index: number) => ({
      role: 'tab' as const,
      id: `${id}-tab-${index}`,
      'aria-selected': activeIndex === index,
      'aria-controls': `${id}-panel-${index}`,
      tabindex: activeIndex === index ? 0 : -1,
      onClick: () => dispatch({ type: 'SELECT', index }),
      onKeyDown: (e: KeyboardEvent) => {
        const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
        const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
        switch (e.key) {
          case nextKey:
            e.preventDefault()
            dispatch({ type: 'ARROW_RIGHT', total })
            break
          case prevKey:
            e.preventDefault()
            dispatch({ type: 'ARROW_LEFT', total })
            break
          case 'Home':
            e.preventDefault()
            dispatch({ type: 'HOME' })
            break
          case 'End':
            e.preventDefault()
            dispatch({ type: 'END', total })
            break
        }
      },
    }),
    [id, activeIndex, dispatch, orientation, total],
  )

  const getPanelProps = useCallback(
    (index: number) => ({
      role: 'tabpanel' as const,
      id: `${id}-panel-${index}`,
      'aria-labelledby': `${id}-tab-${index}`,
      tabindex: 0,
      hidden: activeIndex !== index,
    }),
    [id, activeIndex],
  )

  return {
    state,
    activeIndex,
    tablistProps,
    getTabProps,
    getPanelProps,
    selectTab: (index: number) => dispatch({ type: 'SELECT', index }),
    dispatch,
  }
}
