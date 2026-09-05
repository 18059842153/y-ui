import React, { forwardRef, useState, useCallback } from 'react'

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  clearable?: boolean
  name?: string
  maxLength?: number
  autoComplete?: string
  className?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const YInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      value,
      defaultValue,
      placeholder,
      disabled = false,
      readOnly = false,
      size = 'md',
      error = false,
      prefix,
      suffix,
      clearable = false,
      name,
      maxLength,
      autoComplete,
      className,
      onChange,
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        if (!isControlled) setInternalValue(newValue)
        onChange?.(newValue)
      },
      [isControlled, onChange],
    )

    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue('')
      onChange?.('')
    }, [isControlled, onChange])

    const wrapperClasses = [
      'y-input-wrapper',
      error ? 'y-input-wrapper--error' : '',
      disabled ? 'y-input-wrapper--disabled' : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={wrapperClasses}>
        {prefix && <span className="y-input__prefix">{prefix}</span>}
        <input
          ref={ref}
          type={type}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={`y-input y-input--${size}`}
          aria-invalid={error || undefined}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {clearable && currentValue && !disabled && !readOnly && (
          <button
            type="button"
            className="y-input__suffix cursor-pointer"
            onClick={handleClear}
            aria-label="Clear"
          >
            ×
          </button>
        )}
        {suffix && <span className="y-input__suffix">{suffix}</span>}
      </div>
    )
  },
)

YInput.displayName = 'YInput'

export { YInput }
