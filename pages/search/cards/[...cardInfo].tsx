import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import NavPanelBtn from 'components/NavPanelBtn'
import SearchForm from 'components/SearchForm'
import getCards from 'services/getCards'
import { apiUrl } from 'consts/configUrl'
import { CardV2 } from 'interface/cardMarket'
import UpButton from 'components/UpButton'
import ListCards from 'components/ListCards'

const pageSize = 25 // Number of cards per page

export default function SearchCardName(props: { cards: CardV2[] }) {
  const [viewSearch, setViewSearch] = useState(false)

  const { cards } = props

  const handleViewSearch = useCallback(() => {
    const isNarrow = window.innerWidth < 550

    isNarrow ? setViewSearch(true) : setViewSearch(false)
  }, [])

  useEffect(() => {
    handleViewSearch()

    window.addEventListener('resize', handleViewSearch)

    return () => window.removeEventListener('resize', handleViewSearch)
  }, [handleViewSearch])

  if (useRouter().isFallback) return <h1>Loading...</h1>

  return (
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
        <NavPanelBtn isEnd={cards.length < pageSize} pathname="/search/cards" />
      </div>
      <UpButton />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = [
    'lucario',
    'mimikyu',
    'umbreon',
    'sylveon',
    'pikachu',
    'eevee',
  ]

  const paths = pokemons.map((pokemon) => {
    return {
      params: {
        cardInfo: [pokemon, '1'],
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const [name, page] = context.params.cardInfo
  const numberPage = page ?? 1

  const paramsV2 = `?q=name:${name}&page=${numberPage}&pageSize=${pageSize}`
  const url = `${apiUrl}/cards${paramsV2}`

  const cards = await Promise.resolve(getCards(url))

  return {
    props: {
      cards,
    },
  }
}
