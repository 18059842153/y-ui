export const isBrowser = typeof window !== 'undefined'

export function getDocument(): Document | null {
  return isBrowser ? document : null
}

export function getWindow(): Window | null {
  return isBrowser ? window : null
}

export function getComputedStyle_(el: HTMLElement): CSSStyleDeclaration | null {
  if (!isBrowser) return null
  return window.getComputedStyle(el)
}

export function requestAnimationFrame_(cb: FrameRequestCallback): number | (() => void) {
  if (!isBrowser) {
    cb(0)
    return () => {}
  }
  return requestAnimationFrame(cb)
}

export function nextTick(): Promise<void> {
  return new Promise((resolve) => {
    if (!isBrowser) {
      resolve()
      return
    }
    requestAnimationFrame(() => resolve())
  })
}

export function useIsomorphicLayoutEffect(
  effect: () => void | (() => void),
  deps?: unknown[],
): void {
  if (!isBrowser) {
    effect()
    return
  }
  // In browser, this would be useLayoutEffect in React
  // For framework-agnostic core, we just call it synchronously
  effect()
}

export function getScrollParent(element: HTMLElement): HTMLElement | null {
  if (!isBrowser) return null

  let parent: HTMLElement | null = element.parentElement

  while (parent) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(parent)
    if (/(auto|scroll)/.test(overflow + overflowX + overflowY)) {
      return parent
    }
    parent = parent.parentElement
  }

  return document.documentElement
}

export function getOffsetRect(element: HTMLElement): DOMRect {
  if (!isBrowser) {
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} }
  }
  return element.getBoundingClientRect()
}
