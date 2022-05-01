import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import useShopping from 'hooks/useShopping'

interface Errors {
  email?: string
  password?: string
}

function Login() {
  const [dataForm, setDataForm] = useState({ email: '', password: '' })

  const { toggleLog } = useShopping()
  const [errors, setErrors] = useState({} as Errors)

  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { email, password } = event.currentTarget
    enum USERDATA {
      EMAIL = 'example@email.com',
      PASSWORD = '12345',
    }

    const isFormValid =
      handleValidation(email, email.value) &&
      handleValidation(password, password.value)

    const isEmailCorrect = dataForm.email === USERDATA.EMAIL
    const isPasswordCorrect = dataForm.password === USERDATA.PASSWORD

    if (isFormValid && isEmailCorrect && isPasswordCorrect) {
      router.back()
      toggleLog()
    } else {
      let errors = {}

      if (!isEmailCorrect) errors = { email: 'Incorrected email' }
      if (!isPasswordCorrect)
        errors = { ...errors, password: 'Incorrected password' }

      setErrors(errors)
    }
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget

    removeError(name)

    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const removeError = (key: string) => {
    // Filter the key "name" from the entries of the object "errors"
    let entries = Object.entries(errors)

    let newEntries = entries.filter((entry) => entry[0] !== key)

    let newErrors = Object.fromEntries(newEntries)
    setErrors(newErrors)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    handleValidation(name, value)
  }

  const handleValidation = (name: string, value: string) => {
    const expReg = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if (name === 'email' && !expReg.test(value)) {
      value
        ? setErrors({ ...errors, email: 'Incorrected email' })
        : setErrors({ ...errors, email: 'Required' })
      return false
    } else if (name === 'password' && !value.trim()) {
      setErrors({ ...errors, password: 'Required' })
      return false
    } else {
      removeError(name)
      return true
    }
  }

  return (
    <div className="containerForm">
      <div className="wrapperForm">
        <figure className="containerImageLogIn">
          <div className="containerImageLogIn__image">
            <Image
              src="/SignIn.webp"
              alt=""
              width={100}
              height={100}
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
          <h1 className="logInTitle">Sign In</h1>
        </figure>
        <form className="logForm" onSubmit={handleSubmit}>
          <fieldset className="logForm__fieldset">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoFocus
              aria-label="Email"
              aria-errormessage="email-errors"
              spellCheck="false"
              autoCorrect="off"
              autoComplete="off"
              onChange={handleInput}
              onBlur={handleBlur}
              className="logForm__input"
              required
            />
            <span
              className={
                errors.email
                  ? `logForm__msg`
                  : `logForm__msg logForm__msg_hidden`
              }
            >
              {errors.email}
            </span>
          </fieldset>
          <fieldset className="logForm__fieldset">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              aria-label="Password"
              aria-errormessage="password-errors"
              onChange={handleInput}
              onBlur={handleBlur}
              className="logForm__input"
              required
            />
            <span
              className={
                errors.password
                  ? `logForm__msg`
                  : `logForm__msg logForm__msg_hidden`
              }
            >
              {errors.password}
            </span>
          </fieldset>
          <button
            type="submit"
            disabled={
              dataForm.email &&
              dataForm.password &&
              Object.keys(errors).length === 0
                ? false
                : true
            }
            className="logForm__btn"
          >
            Log in now
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
