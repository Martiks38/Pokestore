import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import CardItem from 'components/CardItem'
import NavPanelBtn from 'components/NavPanelBtn'
import SearchForm from 'components/SearchForm'
import getCardPrice from 'services/getCardPrice'
import getCards from 'services/getCards'
import { apiUrl } from 'consts/configUrl'
import { typeHover } from 'consts/cardType'
import { CardV2 } from 'interface/cardMarket'

const pageSize = 30

export default function SearchPage(props: { cards: CardV2[] }) {
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
    <div className="resultsSearch">
      {viewSearch && (
        <div className="resultsSearch__form">
          <SearchForm />
        </div>
      )}
      <div className="resultsSearch__results">
        {cards.map((card, index) => (
          <CardItem
            key={card.id}
            alt={card.name}
            id={card.id}
            loading={index < 10 ? 'eager' : 'lazy'}
            price={getCardPrice(card, 'USD')}
            route={`/search/card/${
              encodeURI(card.name) + '-' + encodeURI(card.set.name)
            }/${card.id}`}
            src={card.images.small}
            style={
              card.supertype === 'Pokémon'
                ? typeHover.Pokemon[card.types[0]]
                : typeHover[card.supertype]
            }
            styleCard="card"
          />
        ))}
      </div>
      <NavPanelBtn isEnd={cards.length < pageSize} pathname="/search/page" />
    </div>
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

  return {
    props: {
      cards,
    },
  }
}
