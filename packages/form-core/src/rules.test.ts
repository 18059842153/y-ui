import { describe, it, expect } from 'vitest'
import { validate } from '../src/rules.js'

describe('validate', () => {
  describe('required', () => {
    it('returns error for empty string', async () => {
      expect(await validate('', { required: true })).toBe('This field is required')
    })

    it('returns error for undefined', async () => {
      expect(await validate(undefined, { required: true })).toBe('This field is required')
    })

    it('returns error for null', async () => {
      expect(await validate(null, { required: true })).toBe('This field is required')
    })

    it('returns error for empty array', async () => {
      expect(await validate([], { required: true })).toBe('This field is required')
    })

    it('returns custom message when required is a string', async () => {
      expect(await validate('', { required: 'Name is required' })).toBe('Name is required')
    })

    it('passes for non-empty string', async () => {
      expect(await validate('hello', { required: true })).toBeUndefined()
    })

    it('passes for number 0', async () => {
      expect(await validate(0, { required: true })).toBeUndefined()
    })

    it('passes for false', async () => {
      expect(await validate(false, { required: true })).toBeUndefined()
    })

    it('passes for non-empty array', async () => {
      expect(await validate([1], { required: true })).toBeUndefined()
    })
  })

  describe('min', () => {
    it('returns error when number is below min', async () => {
      expect(await validate(3, { min: 5 })).toBe('Must be at least 5')
    })

    it('passes when number equals min', async () => {
      expect(await validate(5, { min: 5 })).toBeUndefined()
    })

    it('passes when number exceeds min', async () => {
      expect(await validate(10, { min: 5 })).toBeUndefined()
    })

    it('handles string numbers', async () => {
      expect(await validate('3', { min: '5' })).toBe('Must be at least 5')
    })
  })

  describe('max', () => {
    it('returns error when number exceeds max', async () => {
      expect(await validate(15, { max: 10 })).toBe('Must be at most 10')
    })

    it('passes when number equals max', async () => {
      expect(await validate(10, { max: 10 })).toBeUndefined()
    })

    it('passes when number is below max', async () => {
      expect(await validate(5, { max: 10 })).toBeUndefined()
    })
  })

  describe('pattern', () => {
    it('returns default error for RegExp mismatch', async () => {
      expect(await validate('abc', { pattern: /^\d+$/ })).toBe('Invalid format')
    })

    it('passes for RegExp match', async () => {
      expect(await validate('123', { pattern: /^\d+$/ })).toBeUndefined()
    })

    it('returns custom message for { value, message } pattern', async () => {
      const result = await validate('abc', {
        pattern: { value: /^\d+$/, message: 'Numbers only' },
      })
      expect(result).toBe('Numbers only')
    })
  })

  describe('validate (custom function)', () => {
    it('returns string error from sync validator', async () => {
      const result = await validate('foo', {
        validate: (v) => (v === 'foo' ? 'Cannot be foo' : true),
      })
      expect(result).toBe('Cannot be foo')
    })

    it('returns generic error when validator returns false', async () => {
      const result = await validate('bar', {
        validate: () => false,
      })
      expect(result).toBe('Validation failed')
    })

    it('passes when validator returns true', async () => {
      const result = await validate('ok', {
        validate: () => true,
      })
      expect(result).toBeUndefined()
    })

    it('supports async validators', async () => {
      const result = await validate('test', {
        validate: async (v) => (v === 'test' ? 'Taken' : true),
      })
      expect(result).toBe('Taken')
    })
  })

  describe('combined rules', () => {
    it('checks required before min', async () => {
      const result = await validate('', { required: true, min: 5 })
      expect(result).toBe('This field is required')
    })

    it('checks min before pattern', async () => {
      const result = await validate(2, { min: 5, pattern: /^\d+$/ })
      expect(result).toBe('Must be at least 5')
    })

    it('passes when all rules satisfied', async () => {
      const result = await validate(5, {
        required: true,
        min: 3,
        max: 10,
        pattern: /^\d+$/,
      })
      expect(result).toBeUndefined()
    })
  })
})
