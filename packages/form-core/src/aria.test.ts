import { describe, it, expect } from 'vitest'
import { buildFieldAria } from '../src/aria.js'

describe('buildFieldAria', () => {
  it('returns aria-invalid false when no error', () => {
    const result = buildFieldAria('field-email', false)
    expect(result).toEqual({
      id: 'field-email',
      'aria-invalid': false,
      'aria-describedby': undefined,
      'aria-required': undefined,
    })
  })

  it('returns aria-invalid true and error id when has error', () => {
    const result = buildFieldAria('field-email', true)
    expect(result).toEqual({
      id: 'field-email',
      'aria-invalid': true,
      'aria-describedby': 'field-email-error',
      'aria-required': undefined,
    })
  })

  it('sets aria-required when required is true', () => {
    const result = buildFieldAria('field-name', false, true)
    expect(result['aria-required']).toBe(true)
  })

  it('omits aria-required when required is false', () => {
    const result = buildFieldAria('field-name', false, false)
    expect(result['aria-required']).toBeUndefined()
  })
})
