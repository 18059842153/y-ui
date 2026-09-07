# React Hook Form

The `@y-ui/form-react` package provides seamless integration between Y-UI components and [React Hook Form](https://react-hook-form.com/).

## Installation

```bash
npm install @y-ui/form-react react-hook-form
```

## Quick Start

```tsx
import { useForm } from 'react-hook-form'
import { YInputField, YSelectField } from '@y-ui/form-react'

function SignupForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      role: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <YInputField
        control={control}
        name="email"
        label="Email"
        rules={{ required: 'Email is required' }}
        error={errors.email?.message}
      />

      <YSelectField
        control={control}
        name="role"
        label="Role"
        options={[
          { label: 'Developer', value: 'dev' },
          { label: 'Designer', value: 'designer' },
        ]}
        rules={{ required: 'Please select a role' }}
        error={errors.role?.message}
      />

      <button type="submit">Submit</button>
    </form>
  )
}
```

## `createFormField`

Wrap any Y-UI input component to make it form-aware:

```tsx
import { createFormField } from '@y-ui/form-react'
import { YInput } from '@y-ui/react'

const YInputField = createFormField(YInput)
```

The wrapper:
- Connects the component to React Hook Form's `<Controller>`
- Maps `error` prop to ARIA attributes (`aria-invalid`, `aria-describedby`)
- Forwards `ref` for focus management

## Pre-built Fields

| Component | Description |
|---|---|
| `YInputField` | Text input with validation |
| `YSelectField` | Select dropdown with validation |

## Rule Conversion

Use `toRhfRules()` to convert Y-UI validation rules to React Hook Form format:

```ts
import { toRhfRules } from '@y-ui/form-react'

const rules = toRhfRules([
  { type: 'required', message: 'Required' },
  { type: 'email', message: 'Invalid email' },
  { type: 'min', value: 3, message: 'Too short' },
])
```

## Validation Rules

Y-UI form-core supports these rule types:

| Rule | Description |
|---|---|
| `required` | Value must not be empty |
| `min` | Minimum numeric value or string length |
| `max` | Maximum numeric value or string length |
| `pattern` | Regex pattern match |
| `email` | Valid email format |

## Error Display

Errors are automatically displayed via the `YFormField` wrapper. The error message appears below the input with `role="alert"` for screen reader announcements.
