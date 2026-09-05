export type KeyHandler = (e: KeyboardEvent) => void

export function createKeyboardNav(config: {
  onArrowDown?: KeyHandler
  onArrowUp?: KeyHandler
  onArrowLeft?: KeyHandler
  onArrowRight?: KeyHandler
  onEnter?: KeyHandler
  onSpace?: KeyHandler
  onEscape?: KeyHandler
  onHome?: KeyHandler
  onEnd?: KeyHandler
}): KeyHandler {
  return (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        config.onArrowDown?.(e)
        break
      case 'ArrowUp':
        config.onArrowUp?.(e)
        break
      case 'ArrowLeft':
        config.onArrowLeft?.(e)
        break
      case 'ArrowRight':
        config.onArrowRight?.(e)
        break
      case 'Enter':
        config.onEnter?.(e)
        break
      case ' ':
        config.onSpace?.(e)
        break
      case 'Escape':
        config.onEscape?.(e)
        break
      case 'Home':
        config.onHome?.(e)
        break
      case 'End':
        config.onEnd?.(e)
        break
    }
  }
}
