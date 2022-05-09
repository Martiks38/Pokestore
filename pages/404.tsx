import Head from 'next/head'

function Page404() {
  return (
    <>
      <Head>
        <title>Error 404 | Pokestore</title>
        <meta name="description" content="Error not found" />
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
