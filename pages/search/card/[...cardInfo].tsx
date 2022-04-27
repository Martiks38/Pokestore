import { apiUrl } from 'consts/configUrl'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import getCards from 'services/getCards'
import { typeCard } from 'types/typeCard'

function CardInfo(props: { card: PokemonTCG.Card }) {
  const { card } = props

  let priceCard

  if (card) {
    const prices = card.tcgplayer.prices

    const typeCard = Object.keys(prices)[0] as typeCard

    priceCard = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(prices[typeCard].market)
  }

  console.log(card)

  return (
    <>
      {card && (
        <div className="cardInfo">
          <figure className="cardInfo__imgContainer">
            <img
              src={card.images.small}
              alt={card.name}
              className="cardInfo__card"
            />
          </figure>
          <article className="cardInfo__description">
            <section className="description__section">
              <span className="description__header">
                <h1 className="description__title">{card.name}</h1>
                {card.types && (
                  <span className="description__type">
                    <Image
                      src={`/${card.types[0]}.webp`}
                      alt={card.types[0]}
                      width={32}
                      height={32}
                      layout="fixed"
                      priority
                    />
                  </span>
                )}
              </span>
              <h2 className="description__subtitle">
                {card.supertype} - {card.subtypes.join(' ')}
              </h2>
            </section>
            <div className="partingLine"></div>
            <section className="description__section">
              {card.rules && <h3 className="description__principal">Rules</h3>}
              {card.rules &&
                card.rules.map((rule, index) => (
                  <p key={`${card.id}-${index}`} className="description__text">
                    {rule}
                  </p>
                ))}
              <h3 className="description__principal">Rarity</h3>
              <span className="description__text">{card.rarity}</span>
            </section>
            <div className="partingLine"></div>
            <section className="description__section">
              <h3 className="description__principal">Price</h3>
              <h4 className="description__priceUpdate">
                Last Updated {card.tcgplayer.updatedAt}
              </h4>
              <span className="description__price">{priceCard}</span>
              <button className="buyButton">ADD TO CART</button>
            </section>
          </article>
        </div>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { cardInfo } = context.params
  const [, id] = cardInfo

  const url = `${apiUrl}/cards/${id}`

  const card = await Promise.resolve(getCards(url))

  return {
    props: {
      card,
    },
  }
}

export default CardInfo
