import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { dialogTransition } from '@y-ui/core'
import type { DialogState, DialogEvent } from '@y-ui/core'

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

export function useDialog(config: UseDialogConfig = {}): UseDialogReturn {
  const { defaultOpen = false, onOpenChange, id = 'y-dialog', modal = true } = config

  const [state, setState] = useState<DialogState>(
    config.open !== undefined
      ? config.open ? { type: 'open' } : { type: 'closed' }
      : defaultOpen ? { type: 'open' } : { type: 'closed' },
  )

  const isControlled = config.open !== undefined

  const dispatch = useCallback(
    (event: DialogEvent) => {
      setState((prev) => {
        const next = dialogTransition(prev, event)
        onOpenChange?.(next.type === 'open')
        return next
      })
    },
    [onOpenChange],
  )

  useEffect(() => {
    if (isControlled) {
      setState(config.open ? { type: 'open' } : { type: 'closed' })
    }
  }, [isControlled, config.open])

  useEffect(() => {
    if (state.type !== 'open') return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE' })
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [state, dispatch])

  const previousFocus = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (state.type === 'open') {
      previousFocus.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (previousFocus.current) {
        previousFocus.current.focus()
        previousFocus.current = null
      }
    }
    return () => { document.body.style.overflow = '' }
  }, [state])

  const isOpen = state.type === 'open'

  const dialogProps = useMemo(
    () => ({
      role: modal ? ('dialog' as const) : undefined,
      'aria-modal': modal ? isOpen : undefined,
      'aria-labelledby': `${id}-title`,
      id,
    }),
    [modal, isOpen, id],
  )

  const titleProps = useMemo(() => ({ id: `${id}-title` }), [id])

  const closeButtonProps = useMemo(
    () => ({
      'aria-label': 'Close',
      onClick: () => dispatch({ type: 'CLOSE' }),
    }),
    [dispatch],
  )

  return {
    state,
    isOpen,
    dialogProps,
    titleProps,
    closeButtonProps,
    open: () => dispatch({ type: 'OPEN' }),
    close: () => dispatch({ type: 'CLOSE' }),
    toggle: () => dispatch({ type: 'TOGGLE' }),
    dispatch,
  }
}
