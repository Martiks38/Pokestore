import { FormActions, InitialForm } from 'interface/form'
import { FORM_TYPES } from './action'

const init = { value: '', error: '', hasError: false }

export const InitialStateForm: InitialForm = {
  card: init,
  cardNumber: init,
  email: init,
  month: init,
  name: init,
  password: init,
  surname: init,
  year: init,
  zipCode: init,
}

export function formReducer(state: InitialForm, action: FormActions) {
  switch (action.type) {
    case FORM_TYPES.HANDLEVALIDATION: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case FORM_TYPES.HANDLECHANGE: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case FORM_TYPES.INIT_FORM: {
      return action.payload
    }

    default:
      return state
  }
}
