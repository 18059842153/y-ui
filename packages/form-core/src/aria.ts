import type { FieldAriaProps } from './types.js'

export function buildFieldAria(
  id: string,
  hasError: boolean,
  required?: boolean,
): FieldAriaProps {
  return {
    id,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? `${id}-error` : undefined,
    'aria-required': required || undefined,
  }
}
