import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import SearchForm from 'components/SearchForm'
import Img from 'components/Imgs'
import styles from '../styles/Home.module.scss'

import type { NextPage } from 'next'
import CardsInHome from 'components/CardsInHome'

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
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="https://api.pokemontcg.io" />
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
