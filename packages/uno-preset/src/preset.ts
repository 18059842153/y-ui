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
      [new RegExp(`^${prefix}-btn--(primary|secondary|outline|ghost|danger)$`), ([, variant]) => {
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

      // Input sizes
      [new RegExp(`^${prefix}-input--(sm|md|lg)$`), ([, size]) => {
        const sizes: Record<string, Record<string, string>> = {
          sm: { 'padding': '2px 8px', 'font-size': 'var(--y-text-xs)' },
          md: { 'padding': 'var(--y-input-padding-y) var(--y-input-padding-x)', 'font-size': 'var(--y-input-font-size)' },
          lg: { 'padding': '10px 16px', 'font-size': 'var(--y-text-base)' },
        }
        return sizes[size]
      }],

      // Select sizes
      [new RegExp(`^${prefix}-select--(sm|md|lg)$`), ([, size]) => {
        const sizes: Record<string, Record<string, string>> = {
          sm: { 'padding': '2px 8px', 'font-size': 'var(--y-text-xs)' },
          md: { 'padding': 'var(--y-select-padding-y) var(--y-select-padding-x)', 'font-size': 'var(--y-select-font-size)' },
          lg: { 'padding': '10px 16px', 'font-size': 'var(--y-text-base)' },
        }
        return sizes[size]
      }],

      // Tabs type variants
      [new RegExp(`^${prefix}-tabs--(line|card|segment)$`), () => ({})],

      // Tabs sizes
      [new RegExp(`^${prefix}-tabs--(sm|md|lg)$`), ([, size]) => {
        const sizes: Record<string, Record<string, string>> = {
          sm: { 'font-size': 'var(--y-text-xs)' },
          md: { 'font-size': 'var(--y-tabs-font-size)' },
          lg: { 'font-size': 'var(--y-tabs-font-size-lg)' },
        }
        return sizes[size]
      }],

      // Card sizes
      [new RegExp(`^${prefix}-card--(sm|md|lg)$`), ([, size]) => {
        const sizes: Record<string, Record<string, string>> = {
          sm: { 'padding': 'var(--y-space-2)' },
          md: { 'padding': 'var(--y-card-padding)' },
          lg: { 'padding': 'var(--y-space-8)' },
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
      // ── Button ──
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

      // ── Input ──
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

      [`${prefix}-input-wrapper`]: [
        'inline-flex items-center w-full',
        'bg-[var(--y-input-bg)]',
        'border border-[var(--y-input-border)]',
        `rounded-[var(--y-input-radius)]`,
        'transition-colors',
        'focus-within:border-[var(--y-input-border-focus)] focus-within:ring-2 focus-within:ring-[var(--y-color-ring)] focus-within:ring-offset-1',
      ].join(' '),

      [`${prefix}-input-wrapper--error`]: [
        'border-[var(--y-color-danger)]',
        'focus-within:border-[var(--y-color-danger)] focus-within:ring-[var(--y-color-danger)]',
      ].join(' '),

      [`${prefix}-input-wrapper--disabled`]: 'opacity-50 cursor-not-allowed bg-[var(--y-color-bg-muted)]',

      [`${prefix}-input__prefix`]: 'inline-flex items-center pl-[var(--y-input-padding-x)] text-[var(--y-color-text-muted)]',
      [`${prefix}-input__suffix`]: 'inline-flex items-center pr-[var(--y-input-padding-x)] text-[var(--y-color-text-muted)]',

      // ── Select ──
      [`${prefix}-select`]: 'relative inline-block w-full',
      [`${prefix}-select--disabled`]: 'opacity-50 pointer-events-none',
      [`${prefix}-select--error`]: '',

      [`${prefix}-select__trigger`]: [
        'inline-flex items-center justify-between w-full cursor-pointer',
        'bg-[var(--y-select-bg)]',
        'border border-[var(--y-select-border)]',
        `rounded-[var(--y-select-radius)]`,
        'text-[var(--y-select-text)]',
        'focus:outline-none focus:border-[var(--y-select-border-focus)] focus:ring-2 focus:ring-[var(--y-color-ring)]',
        'transition-colors',
      ].join(' '),

      [`${prefix}-select__value`]: 'truncate',
      [`${prefix}-select__placeholder`]: 'text-[var(--y-select-placeholder)]',
      [`${prefix}-select__arrow`]: 'ml-2 text-[var(--y-color-text-muted)] transition-transform',

      [`${prefix}-select__dropdown`]: [
        'absolute z-[var(--y-z-dropdown)] mt-1 w-full',
        'bg-[var(--y-select-dropdown-bg)]',
        'border border-[var(--y-color-border)]',
        `rounded-[var(--y-select-dropdown-radius)]`,
        'shadow-[var(--y-select-dropdown-shadow)]',
        'overflow-auto max-h-60 py-1',
      ].join(' '),

      [`${prefix}-select__option`]: [
        'px-[var(--y-select-padding-x)] py-[var(--y-select-padding-y)]',
        'text-[var(--y-select-option-text)]',
        'cursor-pointer transition-colors',
        'hover:bg-[var(--y-select-option-bg-hover)]',
      ].join(' '),

      [`${prefix}-select__option--active`]: 'bg-[var(--y-select-option-bg-active)]',

      // ── Dialog ──
      [`${prefix}-dialog-overlay`]: [
        'fixed inset-0 z-[var(--y-z-modal)]',
        'flex items-center justify-center',
        'animate-[y-fade-in_var(--y-duration-normal)]',
      ].join(' '),

      [`${prefix}-dialog-mask`]: [
        'absolute inset-0',
        'bg-[var(--y-dialog-overlay-bg)]',
      ].join(' '),

      [`${prefix}-dialog`]: [
        'relative',
        'bg-[var(--y-dialog-bg)]',
        `rounded-[var(--y-dialog-radius)]`,
        'shadow-[var(--y-dialog-shadow)]',
        'max-w-[var(--y-dialog-max-width)] w-full',
        'animate-[y-scale-in_var(--y-duration-normal)]',
      ].join(' '),

      [`${prefix}-dialog__header`]: [
        'flex items-center justify-between',
        'px-[var(--y-dialog-header-padding)] py-[var(--y-space-4)]',
        'border-b border-[var(--y-color-border)]',
      ].join(' '),

      [`${prefix}-dialog__title`]: [
        'text-[var(--y-dialog-title-size)]',
        'font-[var(--y-dialog-title-weight)]',
        'text-[var(--y-color-text)]',
        'm-0',
      ].join(' '),

      [`${prefix}-dialog__close`]: [
        'inline-flex items-center justify-center',
        'w-8 h-8',
        'text-[var(--y-dialog-close-size)]',
        'text-[var(--y-dialog-close-color)]',
        'hover:text-[var(--y-dialog-close-color-hover)]',
        'bg-transparent border-none cursor-pointer',
        `rounded-[var(--y-radius-4)]`,
        'transition-colors',
      ].join(' '),

      [`${prefix}-dialog__body`]: [
        'px-[var(--y-dialog-body-padding)] py-[var(--y-space-4)]',
        'text-[var(--y-color-text)]',
      ].join(' '),

      [`${prefix}-dialog__footer`]: [
        'flex items-center justify-end gap-2',
        'px-[var(--y-dialog-footer-padding)]',
        'border-t border-[var(--y-dialog-footer-border)]',
      ].join(' '),

      // ── Tabs ──
      [`${prefix}-tabs`]: 'w-full',

      [`${prefix}-tabs__nav`]: [
        'flex items-center',
        'border-b border-[var(--y-tabs-nav-border)]',
        'gap-[var(--y-tabs-gap)]',
      ].join(' '),

      [`${prefix}-tabs__tab`]: [
        'relative',
        'px-[var(--y-tabs-padding-x)] py-[var(--y-tabs-padding-y)]',
        'text-[var(--y-tabs-text)]',
        'bg-transparent border-none cursor-pointer',
        'transition-colors',
        `rounded-t-[var(--y-tabs-tab-radius)]`,
        'hover:text-[var(--y-color-text)] hover:bg-[var(--y-tabs-bg-hover)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'whitespace-nowrap',
      ].join(' '),

      [`${prefix}-tabs__tab--active`]: [
        'text-[var(--y-tabs-text-active)]',
        'font-medium',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        `after:h-[var(--y-tabs-indicator-width)]`,
        'after:bg-[var(--y-tabs-indicator)]',
        `after:rounded-[var(--y-radius-2)]`,
        'after:content-[""]',
      ].join(' '),

      [`${prefix}-tabs__content`]: 'py-[var(--y-space-4)]',

      // ── Card ──
      [`${prefix}-card`]: [
        'bg-[var(--y-card-bg)]',
        `rounded-[var(--y-card-radius)]`,
        'shadow-[var(--y-card-shadow)]',
        'overflow-hidden',
      ].join(' '),

      [`${prefix}-card--bordered`]: 'border border-[var(--y-card-border)]',

      [`${prefix}-card--hoverable`]: [
        'cursor-pointer transition-shadow',
        'hover:shadow-[var(--y-shadow-md)]',
      ].join(' '),

      [`${prefix}-card__cover`]: 'w-full overflow-hidden',
      [`${prefix}-card__cover > img`]: 'w-full h-full object-cover',

      [`${prefix}-card__header`]: [
        'flex items-center justify-between',
        'px-[var(--y-card-padding)] py-[var(--y-space-3)]',
        'border-b border-[var(--y-card-border)]',
      ].join(' '),

      [`${prefix}-card__title`]: [
        'text-[var(--y-text-base)]',
        'font-[var(--y-font-semibold)]',
        'text-[var(--y-color-text)]',
        'm-0',
      ].join(' '),

      [`${prefix}-card__extra`]: 'text-[var(--y-color-text-secondary)]',

      [`${prefix}-card__body`]: 'px-[var(--y-card-padding)] py-[var(--y-space-4)]',

      [`${prefix}-card__loading`]: 'flex items-center justify-center py-[var(--y-space-8)]',

      [`${prefix}-card__loading-dot`]: [
        'w-2 h-2 mx-1 rounded-full',
        'bg-[var(--y-color-primary)]',
        'animate-[y-bounce_1.4s_infinite]',
      ].join(' '),

      // ── Utilities ──
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
