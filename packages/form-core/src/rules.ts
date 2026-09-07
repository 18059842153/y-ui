import type { ValidationRule } from './types.js'

export async function validate(
  value: any,
  rules: ValidationRule,
): Promise<string | undefined> {
  if (rules.required) {
    const isEmpty =
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    if (isEmpty) {
      return typeof rules.required === 'string'
        ? rules.required
        : 'This field is required'
    }
  }

  if (rules.min != null) {
    const numVal = typeof value === 'string' ? Number(value) : value
    const minVal = typeof rules.min === 'string' ? Number(rules.min) : rules.min
    if (numVal < minVal) {
      return `Must be at least ${minVal}`
    }
  }

  if (rules.max != null) {
    const numVal = typeof value === 'string' ? Number(value) : value
    const maxVal = typeof rules.max === 'string' ? Number(rules.max) : rules.max
    if (numVal > maxVal) {
      return `Must be at most ${maxVal}`
    }
  }

  if (rules.pattern) {
    const regex = rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value
    const message =
      rules.pattern instanceof RegExp
        ? 'Invalid format'
        : rules.pattern.message
    if (typeof value === 'string' && !regex.test(value)) {
      return message
    }
  }

  if (rules.validate) {
    const result = await rules.validate(value)
    if (typeof result === 'string') return result
    if (result === false) return 'Validation failed'
  }

  return undefined
}
