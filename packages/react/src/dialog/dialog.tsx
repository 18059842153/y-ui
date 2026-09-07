import React, { forwardRef, useEffect, useRef, useCallback } from 'react'
import { YIcon } from '../icon'

export interface DialogProps {
  open?: boolean
  title?: string
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
  width?: string | number
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
  onClose?: () => void
}

const YDialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = false,
      title,
      closable = true,
      mask = true,
      maskClosable = true,
      width,
      footer,
      children,
      className,
      onClose,
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null)
    const previousFocus = useRef<HTMLElement | null>(null)

    const handleOverlayClick = useCallback(() => {
      if (maskClosable && mask) onClose?.()
    }, [maskClosable, mask, onClose])

    const handleDialogClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation()
    }, [])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closable) onClose?.()
      },
      [closable, onClose],
    )

    useEffect(() => {
      if (open) {
        previousFocus.current = document.activeElement as HTMLElement
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        if (previousFocus.current) {
          previousFocus.current.focus()
        }
      }
    }, [open, handleKeyDown])

    if (!open) return null

    const dialogStyle: React.CSSProperties = width != null
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : {}

    const classes = ['y-dialog', className || ''].filter(Boolean).join(' ')

    return (
      <div className="y-dialog-overlay" onClick={handleOverlayClick}>
        {mask && <div className="y-dialog-mask" />}
        <div
          ref={(node) => {
            (dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          className={classes}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'y-dialog-title' : undefined}
          style={dialogStyle}
          onClick={handleDialogClick}
        >
          {(title || closable) && (
            <div className="y-dialog__header">
              {title && (
                <h2 id="y-dialog-title" className="y-dialog__title">
                  {title}
                </h2>
              )}
              {closable && (
                <button
                  type="button"
                  className="y-dialog__close"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <YIcon name="x" size={16} />
                </button>
              )}
            </div>
          )}
          <div className="y-dialog__body">{children}</div>
          {footer && <div className="y-dialog__footer">{footer}</div>}
        </div>
      </div>
    )
  },
)

YDialog.displayName = 'YDialog'

export { YDialog }
