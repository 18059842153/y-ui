import { isBrowser, getDocument } from './ssr.js'

export type Direction = 'ltr' | 'rtl'

export function getDirection(): Direction {
  if (!isBrowser) return 'ltr'
  const doc = getDocument()
  if (!doc) return 'ltr'
  return (doc.documentElement.dir || 'ltr') as Direction
}

export function setDirection(dir: Direction): void {
  if (!isBrowser) return
  const doc = getDocument()
  if (!doc) return
  doc.documentElement.dir = dir
  doc.documentElement.lang = dir === 'rtl' ? 'ar' : 'en'
}

export function isRTL(): boolean {
  return getDirection() === 'rtl'
}

export function onDirectionChange(callback: (dir: Direction) => void): () => void {
  if (!isBrowser) return () => {}

  const observer = new MutationObserver(() => {
    callback(getDirection())
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
  })

  return () => observer.disconnect()
}

export function logicalProp(prop: string, side: 'start' | 'end'): string {
  const dir = getDirection()
  const isStart = side === 'start'
  const isLtr = dir === 'ltr'

  if ((isStart && isLtr) || (!isStart && !isLtr)) {
    return prop.replace(/inline-(start|end)/, 'left')
  }
  return prop.replace(/inline-(start|end)/, 'right')
}
