import { creditCards } from 'consts/creditCard'
import { years } from 'consts/selecPayment'
import useShopping from 'hooks/useShopping'
import { FormFields, InitialForm } from 'interface/form'
import { useRouter } from 'next/router'
import { createContext, useEffect, useReducer } from 'react'
import { formReducer, InitialStateForm } from 'reducer/form'
import { FORM_TYPES } from 'reducer/form/action'
import type { eventChange, eventFocus, eventSubmit } from 'types/events'

interface FormContext {
  state: InitialForm
  handleBlur: (event: eventFocus) => void
  handleChange: (event: eventChange) => void
  handleSubmit: (event: eventSubmit, isLogin?: boolean) => void
}

const validateFormFields: {
  [index: string]: (value: string) => Pick<FormFields, 'value'> | FormFields
} = {
  card: (value: string) => {
    return creditCards.includes(value)
      ? { value }
      : { value, error: 'It is not a valid card', hasError: true }
  },
  cardNumber: (value: string) => {
    return /[0-9]{14,19}/.test(value)
      ? { value }
      : value.trim()
      ? { value, error: 'It is not a valid card number', hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  email: (value: string) => {
    return /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(
      value
    )
      ? { value }
      : value.trim()
      ? { value, error: 'It is not a valid email', hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  month: (value: string) => {
    return parseInt(value) < 13 || parseInt(value) > 0
      ? { value }
      : { value, error: 'It is not a valid month', hasError: true }
  },
  name: (value: string) => {
    return /^[a-zñáéíóúü'\s]+$/gi.test(value)
      ? { value }
      : value.trim()
      ? { value, error: 'It is not a valid name', hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  password: (value: string) => {
    return /^.{6,18}$/.test(value)
      ? { value }
      : value.trim()
      ? { value, error: 'It is not a valid password', hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  surname: (value: string) => {
    return /^[a-zñáéíóúü'\s]+$/gi.test(value.trim())
      ? { value }
      : value.trim()
      ? { value, error: 'It is not a valid surname', hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  year: (value: string) => {
    return years.includes(parseInt(value))
      ? { value }
      : { value, error: 'Required', hasError: true }
  },
  zipCode: (value: string) => {
    return /^[0-9]{4,9}$/.test(value)
      ? { value }
      : value.trim()
      ? { value, error: 'It is not a valid postcode', hasError: true }
      : { value, error: 'Required', hasError: true }
  },
}

export const FormCtx = createContext<FormContext | null>(null)

function FormProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [state, dispatch] = useReducer(formReducer, InitialStateForm)
  const { toggleLog } = useShopping()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/login' || router.pathname === '/cart/payment') {
      dispatch({
        type: FORM_TYPES.INIT_FORM,
        payload: InitialStateForm,
      })
    }
  }, [router])

  const handleValidation = (name: string, value: string) => {
    dispatch({
      type: FORM_TYPES.HANDLEVALIDATION,
      payload: { [name]: validateFormFields[name](value) },
    })
  }

  const handleBlur = (event: eventFocus) => {
    const { name, value } = event.currentTarget
    handleValidation(name, value)
  }

  const handleChange = (event: eventChange) => {
    const { name, value } = event.currentTarget
    dispatch({ type: FORM_TYPES.HANDLECHANGE, payload: { [name]: value } })
  }

  const handleSubmit = (event: eventSubmit, isLogin?: boolean) => {
    event.preventDefault()

    if (isLogin) {
      const { email, password } = event.currentTarget

      handleValidation(email.name, email.value)
      handleValidation(password.name, password.value)

      if (!(state.email.hasError && state.password.hasError)) {
        let { email, password } = InitialStateForm

        dispatch({
          type: FORM_TYPES.HANDLECHANGE,
          payload: { email, password },
        })
        toggleLog()
        router.push('/')
      }

      return
    }

    let hasError: boolean = false

    let formPayment = Object.entries(state).filter(
      (key) => !(key[0] === 'email' || key[0] === 'password')
    )

    formPayment.forEach((field) => handleValidation(field[0], field[1].value))

    let values: FormFields[] = formPayment.map((field) => field[1])
    console.log('hi')
    for (let value in values) {
      // if (value.hasError) {
      //   hasError = true
      // }
    }

    if (!hasError) {
      let { email, password, ...initPayment } = InitialStateForm
      dispatch({
        type: FORM_TYPES.HANDLECHANGE,
        payload: initPayment,
      })
      router.push('/successfulPurchase')
    }
  }

  return (
    <FormCtx.Provider value={{ handleBlur, handleChange, handleSubmit, state }}>
      {children}
    </FormCtx.Provider>
  )
}

export default FormProvider
