import { Show, Slot } from '@builder.io/mitosis'
import type { DialogProps } from './types'

export default function YDialog(props: DialogProps) {
  return (
    <Show when={props.open}>
      <div class="y-dialog-overlay" onClick={() => props.maskClosable !== false && props.mask !== false && props.onClose?.()}>
        <Show when={props.mask !== false}>
          <div class="y-dialog-mask" />
        </Show>
        <div
          class="y-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="y-dialog-title"
          style={{ width: typeof props.width === 'number' ? `${props.width}px` : props.width }}
          onClick={(e) => e.stopPropagation()}
        >
          <div class="y-dialog__header">
            <Show when={props.title}>
              <h2 id="y-dialog-title" class="y-dialog__title">{props.title}</h2>
            </Show>
            <Show when={props.closable !== false}>
              <button
                type="button"
                class="y-dialog__close"
                aria-label="Close"
                onClick={() => props.onClose?.()}
              >
                &times;
              </button>
            </Show>
          </div>
          <div class="y-dialog__body">
            <Slot />
          </div>
          <Show when={props.footer}>
            <div class="y-dialog__footer">
              <Slot name="footer" />
            </div>
          </Show>
        </div>
      </div>
    </Show>
  )
}
