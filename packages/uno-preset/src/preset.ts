import type { Preset } from 'unocss'

export interface PresetYuiOptions {
  prefix?: string
}

export function presetYui(options: PresetYuiOptions = {}): Preset {
  const prefix = options.prefix || 'y'

  return {
    name: '@y-ui/uno-preset',
    rules: [
      // Button variants
      [new RegExp(`^${prefix}-btn--(\\w+)$`), ([, variant]) => {
        const variants: Record<string, Record<string, string>> = {
          primary: {
            'background-color': 'var(--y-btn-bg)',
            'color': 'var(--y-btn-text)',
          },
          secondary: {
            'background-color': 'var(--y-color-bg-muted)',
            'color': 'var(--y-color-text)',
          },
          outline: {
            'background-color': 'transparent',
            'border': `var(--y-btn-border-width) solid var(--y-color-border)`,
            'color': 'var(--y-color-text)',
          },
          ghost: {
            'background-color': 'transparent',
            'color': 'var(--y-color-primary)',
          },
          danger: {
            'background-color': 'var(--y-color-danger)',
            'color': '#fff',
          },
        }
        return variants[variant]
      }],

      // Button sizes
      [new RegExp(`^${prefix}-btn--(sm|md|lg)$`), ([, size]) => {
        const sizes: Record<string, Record<string, string>> = {
          sm: {
            'padding': '4px 8px',
            'font-size': 'var(--y-text-xs)',
          },
          md: {
            'padding': 'var(--y-btn-padding-y) var(--y-btn-padding-x)',
            'font-size': 'var(--y-btn-font-size)',
          },
          lg: {
            'padding': '12px 24px',
            'font-size': 'var(--y-text-base)',
          },
        }
        return sizes[size]
      }],

      // Grid columns
      [new RegExp(`^${prefix}-grid-cols-(\\d+)$`), ([, n]) => ({
        'grid-template-columns': `repeat(${n}, minmax(0, 1fr))`,
      })],

      // Grid rows
      [new RegExp(`^${prefix}-grid-rows-(\\d+)$`), ([, n]) => ({
        'grid-template-rows': `repeat(${n}, minmax(0, 1fr))`,
      })],

      // Gap
      [new RegExp(`^${prefix}-gap-(\\d+)$`), ([, n]) => ({
        'gap': `var(--y-space-${n})`,
      })],
    ],

    shortcuts: {
      [`${prefix}-btn`]: [
        'inline-flex items-center justify-center',
        `rounded-[var(--y-btn-radius)]`,
        'font-medium',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--y-color-ring)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        'cursor-pointer select-none',
      ].join(' '),

      [`${prefix}-btn--block`]: 'w-full',

      [`${prefix}-btn__spinner`]: [
        'animate-spin',
        'w-4 h-4',
        'border-2 border-current border-t-transparent',
        'rounded-full',
      ].join(' '),

      [`${prefix}-btn__label`]: 'inline-flex items-center gap-2',

      [`${prefix}-input`]: [
        'block w-full',
        'bg-[var(--y-input-bg)]',
        'border border-[var(--y-input-border)]',
        `rounded-[var(--y-input-radius)]`,
        'px-[var(--y-input-padding-x)] py-[var(--y-input-padding-y)]',
        'text-[var(--y-input-font-size)] text-[var(--y-input-text)]',
        'placeholder:text-[var(--y-input-placeholder)]',
        'focus:outline-none focus:border-[var(--y-input-border-focus)] focus:ring-2 focus:ring-[var(--y-color-ring)] focus:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors',
      ].join(' '),

      [`${prefix}-card`]: [
        'bg-[var(--y-card-bg)]',
        'border border-[var(--y-card-border)]',
        `rounded-[var(--y-card-radius)]`,
        'shadow-[var(--y-card-shadow)]',
        'p-[var(--y-card-padding)]',
      ].join(' '),

      [`${prefix}-collapse`]: [
        'grid',
        'grid-rows-[0fr]',
        'transition-[grid-template-rows]',
        'duration-[var(--y-duration-normal)]',
        'ease-[var(--y-ease-enter)]',
      ].join(' '),

      'sr-only': [
        'absolute w-px h-px p-0 -m-px overflow-hidden',
        'whitespace-nowrap border-0',
        'clip-rect(0,0,0,0)',
      ].join(' '),
    },

    theme: {
      breakpoints: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  }
}

export default presetYui
