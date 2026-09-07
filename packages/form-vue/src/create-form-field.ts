import { defineComponent, h, type Component, type PropType } from 'vue'
import { useField } from 'vee-validate'
import type { ValidationRule } from '@y-ui/form-core'

export interface CreateFormFieldOptions {
  mapValue?: (value: any) => any
  mapOnChange?: (value: any) => any
}

export function createFormField(
  component: Component,
  options: CreateFormFieldOptions = {},
) {
  const { mapValue, mapOnChange } = options

  return defineComponent({
    name: 'YFormFieldAdapter',
    inheritAttrs: false,
    props: {
      name: { type: String, required: true },
      rules: { type: Object as PropType<Record<string, any>>, default: undefined },
      defaultValue: { type: null, default: undefined },
      label: { type: String, default: undefined },
    },
    setup(props, { attrs }) {
      const { value, errorMessage, handleBlur, handleChange } = useField(
        () => props.name,
        props.rules,
        { initialValue: props.defaultValue },
      )

      return () => {
        const mappedValue = mapValue ? mapValue(value.value) : value.value

        return h(component, {
          ...attrs,
          modelValue: mappedValue,
          'onUpdate:modelValue': (val: any) => {
            const mapped = mapOnChange ? mapOnChange(val) : val
            handleChange(mapped)
          },
          onBlur: handleBlur,
          error: errorMessage.value,
        })
      }
    },
  })
}

export function toVeeValidateRules(
  rules: ValidationRule,
): Record<string, any> {
  const vvRules: Record<string, any> = {}

  if (rules.required) {
    vvRules.required = true
  }
  if (rules.min != null) {
    vvRules.min = typeof rules.min === 'string' ? Number(rules.min) : rules.min
  }
  if (rules.max != null) {
    vvRules.max = typeof rules.max === 'string' ? Number(rules.max) : rules.max
  }

  return vvRules
}
