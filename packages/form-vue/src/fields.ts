import { YInput, YSelect } from '@y-ui/vue'
import { createFormField } from './create-form-field.js'

export const YInputField = createFormField(YInput as any)
export const YSelectField = createFormField(YSelect as any)
