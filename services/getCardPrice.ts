import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { typeCard } from 'types/typeCard'

const getCardPrice = (card: PokemonTCG.Card, currency: string) => {
  const prices = card.tcgplayer.prices

  const typeCard = Object.keys(prices)[0] as typeCard

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(prices[typeCard].market)
}

export default getCardPrice
