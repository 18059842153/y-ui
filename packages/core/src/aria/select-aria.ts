import type { SelectState, SelectContext } from '../machines/select.js'

export function selectAriaAttributes(state: SelectState, context: SelectContext) {
  const baseId = context.id || 'y-select'

  return {
    trigger: {
      role: 'combobox' as const,
      'aria-expanded': state.type === 'open',
      'aria-haspopup': 'listbox' as const,
      'aria-controls': `${baseId}-listbox`,
      'aria-activedescendant':
        state.type === 'open'
          ? `${baseId}-option-${state.highlightedIndex}`
          : undefined,
    },
    listbox: {
      role: 'listbox' as const,
      id: `${baseId}-listbox`,
      'aria-label': context.label,
    },
    option: (index: number) => ({
      role: 'option' as const,
      id: `${baseId}-option-${index}`,
      'aria-selected': state.type === 'open' && state.highlightedIndex === index,
    }),
  }
}
