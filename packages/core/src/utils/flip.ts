export function flipAnimate(
  container: HTMLElement,
  items: HTMLElement[],
  duration = 250,
): void {
  const first = new Map<string, DOMRect>()
  for (const item of items) {
    const id = item.dataset.id
    if (id) first.set(id, item.getBoundingClientRect())
  }

  requestAnimationFrame(() => {
    for (const item of items) {
      const id = item.dataset.id
      if (!id) continue

      const firstRect = first.get(id)
      if (!firstRect) continue

      const lastRect = item.getBoundingClientRect()
      const dx = firstRect.left - lastRect.left
      const dy = firstRect.top - lastRect.top

      if (dx === 0 && dy === 0) continue

      item.style.transform = `translate(${dx}px, ${dy}px)`
      item.style.transition = 'none'

      requestAnimationFrame(() => {
        item.style.transition = `transform ${duration}ms var(--y-ease-enter, cubic-bezier(0, 0, 0.2, 1))`
        item.style.transform = ''

        const cleanup = () => {
          item.style.transition = ''
          item.removeEventListener('transitionend', cleanup)
        }
        item.addEventListener('transitionend', cleanup)
      })
    }
  })
}
