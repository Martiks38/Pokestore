import { useRouter } from 'next/router'
import { createContext, useEffect, useReducer } from 'react'
import useShopping from 'hooks/useShopping'
import { formReducer, InitialStateForm } from 'reducer/form'
import { FORM_TYPES } from 'reducer/form/action'
import { creditCards } from 'consts/creditCard'
import { years } from 'consts/selecPayment'
import { FormFields, InitialForm } from 'interface/form'
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
      ? { value, error: '', hasError: false }
      : { value, error: "It isn't a valid card", hasError: true }
  },
  cardNumber: (value: string) => {
    return /[0-9]{14,19}/.test(value)
      ? { value, error: '', hasError: false }
      : value
      ? { value, error: "It isn't a valid card number", hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  email: (value: string) => {
    return /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(
      value
    )
      ? { value, error: '', hasError: false }
      : value
      ? { value, error: "It isn't a valid email", hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  month: (value: string) => {
    return value
      ? { value, error: '', hasError: false }
      : { value, error: 'Required', hasError: true }
  },
  Name: (value: string) => {
    return /^[a-zñáéíóúü'\s]+$/gi.test(value)
      ? { value, error: '', hasError: false }
      : value
      ? { value, error: "It isn't a valid name", hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  password: (value: string) => {
    return /^.{6,18}$/.test(value)
      ? { value, error: '', hasError: false }
      : value
      ? { value, error: "It isn't a valid password", hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  surname: (value: string) => {
    return /^[a-zñáéíóúü'\s]+$/gi.test(value)
      ? { value, error: '', hasError: false }
      : value
      ? { value, error: "It isn't a valid surname", hasError: true }
      : { value, error: 'Required', hasError: true }
  },
  year: (value: string) => {
    return years.includes(parseInt(value))
      ? { value, error: '', hasError: false }
      : { value, error: 'Required', hasError: true }
  },
  zipCode: (value: string) => {
    return /^[0-9]{4,9}$/.test(value)
      ? { value, error: '', hasError: false }
      : value
      ? { value, error: "It isn't a valid postcode", hasError: true }
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

    let { card, cardNumber, Name, month, surname, year, zipCode } =
      event.currentTarget

    let formState = {
      card: card.value,
      cardNumber: cardNumber.value,
      Name: Name.value,
      month: month.value,
      surname: surname.value,
      year: year.value,
      zipCode: zipCode.value,
    }
    let entriesForm = Object.entries(formState)

    entriesForm.forEach((field) => {
      handleValidation(field[0], field[1])
    })

    let values: FormFields[] = entriesForm.map((field) => field[1])

    for (let value of values) {
      if (value.hasError) {
        hasError = true
        break
      }
    }

    let notOkayDate =
      month.value <= new Date().getMonth() &&
      year.value <= new Date().getFullYear()

    if (notOkayDate) {
      dispatch({
        type: FORM_TYPES.HANDLECHANGE,
        payload: {
          month: {
            value: month.value,
            error: "It isn't a valid date",
            hasError: true,
          },
        },
      })
      return
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
