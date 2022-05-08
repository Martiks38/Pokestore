import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import CardsInHome from 'components/CardsInHome'
import Img from 'components/Imgs'
import SearchForm from 'components/SearchForm'
import styles from '../styles/Home.module.scss'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [viewImages, setViewImages] = useState(true)

  const toggleViewImgs = useCallback(() => {
    const widthWindow = window.innerWidth

    widthWindow < 600 ? setViewImages(false) : setViewImages(true)
  }, [])

  useEffect(() => {
    window.innerWidth < 600 ? setViewImages(false) : setViewImages(true)

    window.addEventListener('resize', toggleViewImgs)

    return () => window.removeEventListener('resize', toggleViewImgs)
  }, [toggleViewImgs])

  return (
    <>
      <Head>
        <title>Home | Pokestore</title>
        <meta
          name="description"
          content="Buy Pokémon cards with Free Shipping. Find cards from all sets at incredible prices."
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta property="og:title" content="Home | Pokestore" />
        <meta property="og:image" content="" />
        <meta
          property="og:description"
          content="Buy Pokémon cards with Free Shipping. Find cards from all sets at incredible prices."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary"></meta>
        <meta property="twitter:title" content="Home | Pokestore" />
        <meta property="twitter:image" content="" />
        <meta
          property="twitter:description"
          content="Buy Pokémon cards with Free Shipping. Find cards from all sets at incredible prices."
        />
        <meta property="twitter:site" content="@Pokestore" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://api.pokemontcg.io" />
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
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {viewImages && <Img src="/eevee.webp" mod="left" />}
          <div className={styles.search}>
            <h1 className={styles.title}>Pokestore</h1>
            <SearchForm />
          </div>
          {viewImages && <Img src="/zorua.webp" mod="right" />}
        </div>
        <CardsInHome />
      </div>
    </>
  )
}

export default Home
