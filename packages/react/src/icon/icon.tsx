import React, { forwardRef, useMemo } from 'react'
import { getIcon } from '@y-ui/icons'

export interface IconProps {
  name: string
  size?: number | string
  color?: string
  strokeWidth?: number
  title?: string
  className?: string
  ariaHidden?: boolean
}

const YIcon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 24,
      color = 'currentColor',
      strokeWidth,
      title,
      className,
      ariaHidden = !title,
    },
    ref,
  ) => {
    const icon = useMemo(() => getIcon(name), [name])

    if (!icon) return null

    const sw = strokeWidth ?? icon.defaultStrokeWidth ?? 2

    return (
      <svg
        ref={ref}
        className={`y-icon${className ? ` ${className}` : ''}`}
        width={size}
        height={size}
        viewBox={icon.viewBox}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap={icon.strokeLinecap || 'round'}
        strokeLinejoin={icon.strokeLinejoin || 'round'}
        aria-hidden={ariaHidden}
        role={title ? 'img' : undefined}
      >
        {title && <title>{title}</title>}
        {icon.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    )
  },
)

YIcon.displayName = 'YIcon'

export { YIcon }
