import { memo } from 'react'
import Card from 'components/Card'
import useFetchingCard from 'hooks/useFetchingCard'
import { paramsHome } from 'consts/configUrl'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

function CardsInHome() {
  const cards = useFetchingCard('cards', paramsHome)

  return (
    <div className="cardsHome">
      {Array.isArray(cards) &&
        cards.map((card: PokemonTCG.Card, index) => (
          <Card
            key={card.id}
            alt={card.name}
            id={card.id}
            src={card.images.small}
            style={`cardsHome__card cardsHome__card_${index + 1}`}
          />
        ))}
    </div>
  )
}

export default memo(CardsInHome)
