import React, { forwardRef, useState, useCallback } from 'react'

export interface TabItem {
  key: string
  label: string
  disabled?: boolean
  closable?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  type?: 'line' | 'card' | 'segment'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
  onChange?: (key: string) => void
}

const YTabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeKey,
      defaultActiveKey,
      type = 'line',
      size = 'md',
      children,
      className,
      onChange,
    },
    ref,
  ) => {
    const [internalKey, setInternalKey] = useState(
      defaultActiveKey ?? items[0]?.key ?? '',
    )
    const isControlled = activeKey !== undefined
    const currentKey = isControlled ? activeKey : internalKey

    const handleSelect = useCallback(
      (key: string) => {
        if (!isControlled) setInternalKey(key)
        onChange?.(key)
      },
      [isControlled, onChange],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        const enabledItems = items.filter((item) => !item.disabled)
        const enabledIndex = enabledItems.findIndex((item) => item.key === items[index].key)

        let nextIndex: number | undefined

        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault()
            nextIndex = (enabledIndex + 1) % enabledItems.length
            break
          case 'ArrowLeft':
            e.preventDefault()
            nextIndex = (enabledIndex - 1 + enabledItems.length) % enabledItems.length
            break
          case 'Home':
            e.preventDefault()
            nextIndex = 0
            break
          case 'End':
            e.preventDefault()
            nextIndex = enabledItems.length - 1
            break
        }

        if (nextIndex !== undefined) {
          const nextItem = enabledItems[nextIndex]
          handleSelect(nextItem.key)
          const tabElement = (e.currentTarget.parentElement?.children[nextIndex] as HTMLElement)
          tabElement?.focus()
        }
      },
      [items, handleSelect],
    )

    const classes = [
      `y-tabs y-tabs--${type} y-tabs--${size}`,
      className || '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes}>
        <div className="y-tabs__nav" role="tablist">
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              className={[
                'y-tabs__tab',
                currentKey === item.key ? 'y-tabs__tab--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-selected={currentKey === item.key}
              disabled={item.disabled}
              tabIndex={currentKey === item.key ? 0 : -1}
              onClick={() => !item.disabled && handleSelect(item.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="y-tabs__content">{children}</div>
      </div>
    )
  },
)

YTabs.displayName = 'YTabs'

export { YTabs }
