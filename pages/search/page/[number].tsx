import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import SearchForm from 'components/SearchForm'
import Card from 'components/Card'
import { apiUrl } from 'consts/configUrl'
import { typeHover } from 'consts/cardType'
import NavPanelBtn from 'components/NavPanelBtn'
import getCards from 'services/getCards'

const pageSize = 30

export default function SearchPage(props: { cards: PokemonTCG.Card[] }) {
  const { cards } = props

  if (useRouter().isFallback) return <h1>Loading...</h1>

  return (
    <div className="resultsSearch">
      <div className="resultsSearch__form">
        <SearchForm />
      </div>
      <div className="resultsSearch__results">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            alt={card.name}
            loading={index < 10 ? 'eager' : 'lazy'}
            route={`search/card/${
              encodeURI(card.name) + '-' + encodeURI(card.set.name)
            }/${card.name}`}
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
