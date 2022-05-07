import CardItem from 'components/CardItem'
import { CardV2 } from 'interface/cardMarket'
import getCardPrice from 'services/getCardPrice'
import { typeHover } from 'consts/cardType'

function ListCards({ cards }: { cards: CardV2[] }) {
  return (
    <>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          alt={card.name}
          id={card.id}
          loading={'lazy'}
          price={getCardPrice(card)}
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
    </>
  )
}

export default ListCards
