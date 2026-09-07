export type TransitionPhase = 'enter' | 'enter-active' | 'enter-done' | 'exit' | 'exit-active' | 'exit-done'

export interface TransitionConfig {
  element: HTMLElement
  enterClass?: string
  enterActiveClass?: string
  enterDoneClass?: string
  exitClass?: string
  exitActiveClass?: string
  exitDoneClass?: string
  duration?: number
  onEnter?: () => void
  onEnterDone?: () => void
  onExit?: () => void
  onExitDone?: () => void
}

export function createTransition(config: TransitionConfig) {
  const {
    element,
    enterClass = 'y-transition-enter',
    enterActiveClass = 'y-transition-enter-active',
    enterDoneClass = 'y-transition-enter-done',
    exitClass = 'y-transition-exit',
    exitActiveClass = 'y-transition-exit-active',
    exitDoneClass = 'y-transition-exit-done',
    duration,
  } = config

  let currentPhase: TransitionPhase = 'exit-done'
  let cleanupFn: (() => void) | null = null

  function getDuration(): number {
    if (duration !== undefined) return duration
    const computed = window.getComputedStyle(element)
    const animDuration = parseFloat(computed.animationDuration || '0') * 1000
    const transDuration = parseFloat(computed.transitionDuration || '0') * 1000
    return Math.max(animDuration, transDuration) || 250
  }

  function clearClasses() {
    element.classList.remove(
      enterClass, enterActiveClass, enterDoneClass,
      exitClass, exitActiveClass, exitDoneClass,
    )
  }

  function enter() {
    if (cleanupFn) {
      cleanupFn()
      cleanupFn = null
    }

    clearClasses()
    element.classList.add(enterClass, enterActiveClass)
    currentPhase = 'enter'
    config.onEnter?.()

    requestAnimationFrame(() => {
      element.classList.remove(enterClass)
      currentPhase = 'enter-active'

      const dur = getDuration()
      const timer = setTimeout(() => {
        element.classList.remove(enterActiveClass)
        element.classList.add(enterDoneClass)
        currentPhase = 'enter-done'
        config.onEnterDone?.()
      }, dur)

      cleanupFn = () => clearTimeout(timer)
    })
  }

  function exit() {
    if (cleanupFn) {
      cleanupFn()
      cleanupFn = null
    }

    clearClasses()
    element.classList.add(exitClass, exitActiveClass)
    currentPhase = 'exit'
    config.onExit?.()

    requestAnimationFrame(() => {
      element.classList.remove(exitClass)
      currentPhase = 'exit-active'

      const dur = getDuration()
      const timer = setTimeout(() => {
        element.classList.remove(exitActiveClass)
        element.classList.add(exitDoneClass)
        currentPhase = 'exit-done'
        config.onExitDone?.()
      }, dur)

      cleanupFn = () => clearTimeout(timer)
    })
  }

  function destroy() {
    if (cleanupFn) {
      cleanupFn()
      cleanupFn = null
    }
    clearClasses()
  }

  function getPhase(): TransitionPhase {
    return currentPhase
  }

  return { enter, exit, destroy, getPhase }
}

export function onTransitionEnd(
  element: HTMLElement,
  callback: () => void,
): () => void {
  function handler() {
    callback()
    element.removeEventListener('transitionend', handler)
    element.removeEventListener('animationend', handler)
  }

  element.addEventListener('transitionend', handler)
  element.addEventListener('animationend', handler)

  return () => {
    element.removeEventListener('transitionend', handler)
    element.removeEventListener('animationend', handler)
  }
}
