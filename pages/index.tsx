import Head from 'next/head'
import { useEffect, useState } from 'react'
import SearchForm from 'components/SearchForm'
import Card from 'components/Card'
import Img from 'components/Imgs'
import { getCards } from 'helpers/getCards'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import styles from '../styles/Home.module.scss'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [viewImages, setViewImages] = useState(true)
  const [cards, setCards] = useState([] as PokemonTCG.Card[])

  useEffect(() => {
    getCards(setCards)

    window.innerWidth < 600 ? setViewImages(false) : setViewImages(true)

    const toggleViewImgs = () => {
      const widthWindow = window.innerWidth

      widthWindow < 600 ? setViewImages(false) : setViewImages(true)
    }

    window.addEventListener('resize', toggleViewImgs)

    return () => window.removeEventListener('resize', toggleViewImgs)
  }, [])

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
        <div className={styles.cards}>
          {Array.isArray(cards) &&
            cards.map((card: PokemonTCG.Card, index) => (
              <Card
                key={card.id}
                id={card.id}
                src={card.images.small}
                alt={card.name}
                style={`cards__card cards__card_${index + 1}`}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Home
