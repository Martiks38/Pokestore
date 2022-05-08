function Page404() {
  return (
    <>
      <figure className="resultsSearch resultsSearch_error">
        <img
          src="/confused404.webp"
          alt="error"
          className="resultsSearch__imgError"
        />
        <figcaption>
          <p className="resultsSearch__textError">
            Oops, an error has occurred.
          </p>
        </figcaption>
      </figure>
    </>
  )
}

export default Page404
