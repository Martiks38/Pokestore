import { FORM_TYPES } from 'reducer/form/action'

export interface FormFields {
  value: string
  error: string
  hasError: boolean
}

export interface InitialForm {
  card?: FormFields
  cardNumber?: FormFields
  email?: FormFields
  month?: FormFields
  name?: FormFields
  password?: FormFields
  surname?: FormFields
  year?: FormFields
  zipCode?: FormFields
}

export interface FormActions {
  type: FORM_TYPES
  payload: InitialForm
}
