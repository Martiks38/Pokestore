import * as axios from 'axios'
import Card from 'components/Card'
import NavPanelBtn from 'components/NavPanelBtn'
import SearchForm from 'components/SearchForm'
import { typeHover } from 'consts/cardType'
import { apiUrl } from 'consts/configUrl'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

const pageSize = 25 // Number of cards per page

export default function SearchCardName(props: { cards: PokemonTCG.Card[] }) {
  const { cards } = props

  if (useRouter().isFallback) return <h1>Loading...</h1>
  console.log(cards[0])
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
            id={card.id}
            src={card.images.small}
            loading={index < 10 ? 'eager' : 'lazy'}
            style={
              card.supertype === 'Pokémon'
                ? typeHover.Pokemon[card.types[0]]
                : typeHover[card.supertype]
            }
            styleCard="card"
          />
        ))}
      </div>
      <NavPanelBtn isEnd={cards.length < pageSize} pathname="/search/cards" />
    </div>
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

  const POKEMONTCG_API_KEY = process.env.POKEMON_API_KEY // Your private api key
  const paramsV2 = `?q=name:${name}&page=${numberPage}&pageSize=${pageSize}`

  const url = `${apiUrl}/cards${paramsV2}`

  const config: axios.AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (POKEMONTCG_API_KEY) {
    config.headers['X-Api-Key'] = POKEMONTCG_API_KEY
  }

  const res = await axios.default.get<any>(url, config)

  const cards = await res.data.data

  return {
    props: {
      cards,
    },
  }
}
