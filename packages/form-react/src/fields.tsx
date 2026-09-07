import { YInput } from '@y-ui/react'
import { YSelect } from '@y-ui/react'
import { createFormField } from './create-form-field.js'

export const YInputField = createFormField(YInput as any)
export const YSelectField = createFormField(YSelect as any)
