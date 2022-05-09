import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import getCards from 'services/getCards'
import NavPanelBtn from 'components/NavPanelBtn'
import SearchForm from 'components/SearchForm'
import UpButton from 'components/UpButton'
import ListCards from 'components/ListCards'
import PlaceholderCards from 'components/PlaceholderCards'
import { apiUrl } from 'consts/configUrl'
import { CardV2 } from 'interface/cardMarket'
import { errors } from 'interface/errorsResults'

const pageSize = 30

export default function SearchPage(props: {
  cards?: CardV2[]
  errors?: errors
  number: string
}) {
  const [viewSearch, setViewSearch] = useState(false)

  const { cards, number } = props

  const handleViewSearch = useCallback(() => {
    const isNarrow = window.innerWidth < 550

    isNarrow ? setViewSearch(true) : setViewSearch(false)
  }, [])

  useEffect(() => {
    handleViewSearch()
    window.addEventListener('resize', handleViewSearch)

    return () => window.removeEventListener('resize', handleViewSearch)
  }, [handleViewSearch])

  if (useRouter().isFallback) return <PlaceholderCards />

  return (
    <>
      <Head>
        <title>Page {number} | Pokestore</title>
        <meta name="description" content={`Page number ${number}.`} />
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
      {props?.cards && (
        <>
          <div className="resultsSearch">
            {viewSearch && (
              <div className="resultsSearch__form">
                <SearchForm />
              </div>
            )}
            <div className="resultsSearch__results">
              <ListCards cards={cards} />
            </div>
            <NavPanelBtn
              isEnd={cards.length < pageSize}
              pathname="/search/page"
            />
          </div>
          <UpButton />
        </>
      )}
      {props?.errors && (
        <>
          <figure className="resultsSearch resultsSearch_error">
            <img
              src="/error404.webp"
              alt="error"
              className="resultsSearch__imgError"
            />
            <figcaption>
              <p className="resultsSearch__textError">
                Error {props.errors.status} {props.errors.statusText}
              </p>
            </figcaption>
          </figure>
        </>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ number: string }> = async () => {
  return {
    paths: [{ params: { number: '1' } }, { params: { number: '2' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const { number } = params

  const paramsV2 = `?page=${number}&pageSize=${pageSize}`
  const url = `${apiUrl}/cards/${paramsV2}`

  const cards = await Promise.resolve(getCards(url))

  if (cards?.status < 200 || cards?.status > 299) {
    return {
      props: {
        errors: {
          status: cards.status,
          statusText: cards.statusText,
        },
        number,
      },
    }
  }

  return {
    props: {
      cards,
      number,
    },
  }
}
