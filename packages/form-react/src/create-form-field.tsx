import React from 'react'
import { Controller, type Control, type FieldValues, type RegisterOptions } from 'react-hook-form'
import type { ValidationRule } from '@y-ui/form-core'

export interface CreateFormFieldOptions {
  mapValue?: (value: any) => any
  mapOnChange?: (value: any) => any
}

export function createFormField<P extends { error?: string; onChange?: (value: any) => void }>(
  Component: React.ComponentType<P>,
  options: CreateFormFieldOptions = {},
) {
  const { mapValue, mapOnChange } = options

  return function FormFieldAdapter<
    TFieldValues extends FieldValues = FieldValues,
  >(props: {
    name: string
    control: Control<TFieldValues>
    rules?: RegisterOptions<TFieldValues>
    label?: string
    defaultValue?: any
    [key: string]: any
  }) {
    const { name, control, rules, defaultValue, ...restProps } = props

    return React.createElement(Controller, {
      name,
      control,
      rules: rules as RegisterOptions,
      defaultValue,
      render({ field, fieldState }: any) {
        const value = mapValue ? mapValue(field.value) : field.value
        const handleChange = (val: any) => {
          const mapped = mapOnChange ? mapOnChange(val) : val
          field.onChange(mapped)
        }

        return React.createElement(Component, {
          ...restProps,
          [Component.displayName === 'YSelect' ? 'value' : 'value']: value,
          onChange: handleChange,
          onBlur: field.onBlur,
          error: fieldState.error?.message,
        } as any)
      },
    })
  }
}

export function toRhfRules(rules: ValidationRule): RegisterOptions {
  const rhfRules: RegisterOptions = {}

  if (rules.required) {
    rhfRules.required = typeof rules.required === 'string' ? rules.required : 'This field is required'
  }
  if (rules.min != null) {
    rhfRules.min = {
      value: typeof rules.min === 'string' ? Number(rules.min) : rules.min,
      message: `Must be at least ${rules.min}`,
    }
  }
  if (rules.max != null) {
    rhfRules.max = {
      value: typeof rules.max === 'string' ? Number(rules.max) : rules.max,
      message: `Must be at most ${rules.max}`,
    }
  }
  if (rules.pattern) {
    const regex = rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value
    const message = rules.pattern instanceof RegExp ? 'Invalid format' : rules.pattern.message
    rhfRules.pattern = { value: regex, message }
  }

  return rhfRules
}
