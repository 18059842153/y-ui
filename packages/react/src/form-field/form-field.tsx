import React from 'react'

export interface FormFieldProps {
  label?: string
  name: string
  error?: string
  required?: boolean
  hint?: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

function YFormField({
  label,
  name,
  error,
  required = false,
  hint,
  disabled = false,
  className,
  children,
}: FormFieldProps) {
  const fieldId = `y-field-${name}`
  const errorId = `${fieldId}-error`

  const classes = [
    'y-form-field',
    disabled ? 'y-form-field--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={fieldId} className="y-form-field__label">
          {label}
          {required && <span className="y-form-field__required">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <span className="y-form-field__hint">{hint}</span>
      )}
      {error && (
        <span id={errorId} className="y-form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export { YFormField }
