export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

export function getCurrentBreakpoint(): Breakpoint | 'base' {
  if (typeof window === 'undefined') return 'base'

  const width = window.innerWidth
  const entries = Object.entries(breakpoints).sort(
    ([, a], [, b]) => b - a,
  ) as [Breakpoint, number][]

  for (const [name, minWidth] of entries) {
    if (width >= minWidth) return name
  }

  return 'base'
}

export function resolveResponsiveProp(
  prop: string | number | Record<string, string | number>,
  prefix: string,
): string {
  if (typeof prop !== 'object') return `${prefix}-${prop}`

  return Object.entries(prop)
    .map(([bp, val]) =>
      bp === 'base' ? `${prefix}-${val}` : `${bp}:${prefix}-${val}`,
    )
    .join(' ')
}
