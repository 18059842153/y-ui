export function trapFocus(container: HTMLElement): () => void {
  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelector),
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  )
  focusable[0]?.focus()

  return () => container.removeEventListener('keydown', handleKeyDown)
}

export function restoreFocus(element: HTMLElement | null): void {
  element?.focus()
}
