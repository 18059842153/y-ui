import { useState, useCallback, useMemo } from 'react'
import { selectTransition } from '@y-ui/core'
import type { SelectState, SelectEvent } from '@y-ui/core'

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

export function useSelect<T = any>(config: UseSelectConfig<T>): UseSelectReturn {
  const { options, onChange, id = 'y-select', label } = config

  const [state, setState] = useState<SelectState>({ type: 'closed' })

  const context = useMemo(() => ({ options, id, label }), [options, id, label])

  const dispatch = useCallback(
    (event: SelectEvent) => {
      setState((prev) => {
        const next = selectTransition(prev, event, context)
        if (event.type === 'ENTER' && prev.type === 'open' && next.type === 'closed') {
          const selected = options[prev.highlightedIndex]
          if (selected) onChange?.(selected)
        }
        return next
      })
    },
    [context, options, onChange],
  )

  const isOpen = state.type === 'open'
  const highlightedIndex = state.type === 'open' ? state.highlightedIndex : -1

  const triggerProps = useMemo(
    () => ({
      role: 'combobox' as const,
      'aria-expanded': isOpen,
      'aria-haspopup': 'listbox' as const,
      'aria-controls': `${id}-listbox`,
      'aria-activedescendant': isOpen ? `${id}-option-${highlightedIndex}` : undefined,
      onClick: () => dispatch({ type: 'TOGGLE' }),
      onKeyDown: (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            dispatch({ type: 'ARROW_DOWN' })
            break
          case 'ArrowUp':
            e.preventDefault()
            dispatch({ type: 'ARROW_UP' })
            break
          case 'Enter':
            e.preventDefault()
            dispatch({ type: 'ENTER' })
            break
          case 'Escape':
            e.preventDefault()
            dispatch({ type: 'ESCAPE' })
            break
          case 'Home':
            if (isOpen) { e.preventDefault(); dispatch({ type: 'HOME' }) }
            break
          case 'End':
            if (isOpen) { e.preventDefault(); dispatch({ type: 'END' }) }
            break
        }
      },
    }),
    [isOpen, highlightedIndex, id, dispatch],
  )

  const listboxProps = useMemo(
    () => ({
      role: 'listbox' as const,
      id: `${id}-listbox`,
      'aria-label': label,
    }),
    [id, label],
  )

  const getOptionProps = useCallback(
    (index: number) => ({
      role: 'option' as const,
      id: `${id}-option-${index}`,
      'aria-selected': isOpen && highlightedIndex === index,
      onClick: () => {
        onChange?.(options[index])
        dispatch({ type: 'CLOSE' })
      },
      onMouseEnter: () => {
        setState((prev) =>
          prev.type === 'open' ? { ...prev, highlightedIndex: index } : prev,
        )
      },
    }),
    [id, isOpen, highlightedIndex, options, onChange, dispatch],
  )

  return { state, isOpen, highlightedIndex, triggerProps, listboxProps, getOptionProps, dispatch }
}
