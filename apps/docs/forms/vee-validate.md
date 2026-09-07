# VeeValidate

The `@y-ui/form-vue` package integrates Y-UI components with [VeeValidate](https://vee-validate.logaretm.com/v4/) for Vue 3 form handling.

## Installation

```bash
npm install @y-ui/form-vue vee-validate
```

## Quick Start

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { YInputField, YSelectField } from '@y-ui/form-vue'

const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    email: '',
    role: '',
  },
})

const [emailField, emailAttrs] = defineField('email')
const [roleField, roleAttrs] = defineField('role')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <YInputField
      v-model="emailField"
      v-bind="emailAttrs"
      label="Email"
      :error="errors.email"
    />

    <YSelectField
      v-model="roleField"
      v-bind="roleAttrs"
      label="Role"
      :options="[
        { label: 'Developer', value: 'dev' },
        { label: 'Designer', value: 'designer' },
      ]"
      :error="errors.role"
    />

    <button type="submit">Submit</button>
  </form>
</template>
```

## `createFormField`

Wrap any Y-UI input component for VeeValidate integration:

```ts
import { createFormField } from '@y-ui/form-vue'
import { YInput } from '@y-ui/vue'

const YInputField = createFormField(YInput)
```

The wrapper:
- Uses VeeValidate's `useField()` composable internally
- Maps `errorMessage` and field meta to ARIA attributes
- Handles `modelValue` / `update:modelValue` for `v-model`

## Pre-built Fields

| Component | Description |
|---|---|
| `YInputField` | Text input with validation |
| `YSelectField` | Select dropdown with validation |

## Validation with Yup

VeeValidate works with Yup for schema validation:

```ts
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const { defineField, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().required().email(),
    role: yup.string().required(),
  }),
})
```

## Error Display

Error messages are shown automatically through the `YFormField` component. The error area uses `role="alert"` so screen readers announce validation errors.

## Composition with `useField`

For custom integrations, use the `useField` composable directly:

```ts
import { useField } from 'vee-validate'

const { value, errorMessage, meta } = useField('username', (val) => {
  if (!val) return 'Required'
  if (val.length < 3) return 'Too short'
  return true
})
```
