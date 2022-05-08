import Image from 'next/image'
import useForm from 'hooks/useForm'
import Head from 'next/head'

function Login() {
  const { formState, handleBlur, handleChange, handleSubmit } = useForm()

  const { email, password } = formState

  return (
    <>
      <Head>
        <title>Login</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#202039" />
      </Head>
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
          <form className="logForm" onSubmit={(e) => handleSubmit(e, true)}>
            <fieldset className="logForm__fieldset">
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                autoFocus
                aria-label="Email"
                aria-errormessage="email-errors"
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                className="logForm__input"
                required
              />
              <span
                className={
                  email.error && email.hasError
                    ? `errorMsg`
                    : `errorMsg errorMsg_hidden`
                }
              >
                {email.error}
              </span>
            </fieldset>
            <fieldset className="logForm__fieldset">
              <input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="off"
                aria-label="Password"
                aria-errormessage="password-errors"
                onChange={handleChange}
                onBlur={handleBlur}
                className="logForm__input"
                required
              />
              <span
                className={
                  password.error && password.hasError
                    ? `errorMsg`
                    : `errorMsg errorMsg_hidden`
                }
              >
                {password.error}
              </span>
            </fieldset>
            <button type="submit" className="logForm__btn">
              Log in now
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
