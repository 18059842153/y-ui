import React, { forwardRef } from 'react'

export interface CardProps {
  title?: string
  extra?: React.ReactNode
  bordered?: boolean
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  cover?: React.ReactNode
  loading?: boolean
  children?: React.ReactNode
  className?: string
}

const YCard = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      extra,
      bordered = true,
      hoverable = false,
      size = 'md',
      cover,
      loading = false,
      children,
      className,
    },
    ref,
  ) => {
    const classes = [
      'y-card',
      `y-card--${size}`,
      bordered ? 'y-card--bordered' : '',
      hoverable ? 'y-card--hoverable' : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes}>
        {cover && <div className="y-card__cover">{cover}</div>}
        {(title || extra) && (
          <div className="y-card__header">
            {title && <h3 className="y-card__title">{title}</h3>}
            {extra && <div className="y-card__extra">{extra}</div>}
          </div>
        )}
        <div className="y-card__body">
          {loading ? (
            <div className="y-card__loading">
              <span className="y-card__loading-dot" />
              <span className="y-card__loading-dot" />
              <span className="y-card__loading-dot" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    )
  },
)

YCard.displayName = 'YCard'

export { YCard }
