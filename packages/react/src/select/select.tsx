import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react'

export interface SelectProps<T = any> {
  options: T[]
  value?: T
  defaultValue?: T
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  multiple?: boolean
  className?: string
  onChange?: (value: T) => void
  getLabel?: (option: T) => string
  getValue?: (option: T) => string
}

function YSelectInner<T = any>(
  {
    options,
    value,
    defaultValue,
    placeholder = 'Select...',
    disabled = false,
    size = 'md',
    error = false,
    className,
    onChange,
    getLabel,
    getValue,
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const getLabelFor = useCallback(
    (opt: T) => (getLabel ? getLabel(opt) : String(opt)),
    [getLabel],
  )

  const handleSelect = useCallback(
    (opt: T) => {
      if (!isControlled) setInternalValue(opt)
      onChange?.(opt)
      setIsOpen(false)
      triggerRef.current?.focus()
    },
    [isControlled, onChange],
  )

  const handleToggle = useCallback(() => {
    if (disabled) return
    setIsOpen((prev) => !prev)
  }, [disabled])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setHighlightedIndex(0)
          } else {
            setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setHighlightedIndex(options.length - 1)
          } else {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
          }
          break
        case 'Enter':
          e.preventDefault()
          if (isOpen && highlightedIndex >= 0) {
            handleSelect(options[highlightedIndex])
          } else {
            setIsOpen(true)
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          break
        case 'Home':
          if (isOpen) {
            e.preventDefault()
            setHighlightedIndex(0)
          }
          break
        case 'End':
          if (isOpen) {
            e.preventDefault()
            setHighlightedIndex(options.length - 1)
          }
          break
      }
    },
    [disabled, isOpen, highlightedIndex, options, handleSelect],
  )

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if ((ref as React.RefObject<HTMLDivElement>)?.current?.contains(target)) return
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, ref])

  const selectedLabel = currentValue != null ? getLabelFor(currentValue) : null

  const classes = [
    'y-select',
    disabled ? 'y-select--disabled' : '',
    error ? 'y-select--error' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        className={`y-select__trigger y-input y-input--${size}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <span className="y-select__value">
          {selectedLabel != null ? (
            <span>{selectedLabel}</span>
          ) : (
            <span className="y-select__placeholder">{placeholder}</span>
          )}
        </span>
        <span className="y-select__arrow" aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="y-select__dropdown" role="listbox">
          {options.map((option, index) => (
            <div
              key={getValue ? getValue(option) : index}
              role="option"
              aria-selected={currentValue === option}
              className={[
                'y-select__option',
                highlightedIndex === index ? 'y-select__option--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {getLabelFor(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const YSelect = forwardRef(YSelectInner) as <T = any>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement

export { YSelect }
