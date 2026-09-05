import React, { forwardRef } from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: string
  children?: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const YButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      loadingText = 'Loading',
      block = false,
      htmlType = 'button',
      children,
      className,
      onClick,
    },
    ref,
  ) => {
    const isDisabled = disabled || loading
    const classes = [
      'y-btn',
      `y-btn--${variant}`,
      `y-btn--${size}`,
      block ? 'y-btn--block' : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        type={htmlType}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        className={classes}
        onClick={onClick}
      >
        {loading && (
          <>
            <span aria-hidden="true" className="y-btn__spinner" />
            <span className="sr-only">{loadingText}</span>
          </>
        )}
        <span className="y-btn__label">{children}</span>
      </button>
    )
  },
)

YButton.displayName = 'YButton'

export { YButton }
