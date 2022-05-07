import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useShopping from 'hooks/useShopping'
import getCardPrice from 'services/getCardPrice'
import getCards from 'services/getCards'
import { apiUrl } from 'consts/configUrl'
import { CardV2 } from 'interface/cardMarket'

function CardInfo(props: { card: CardV2 }) {
  const { card } = props

  const { addToCart } = useShopping()

  if (useRouter().isFallback) <h1>Loading...</h1>

  const priceCard = getCardPrice(card)

  return (
    <>
      {card && (
        <div
          className={
            card.rules || card.rarity
              ? 'cardInfo'
              : 'cardInfo cardInfo_fewInformation'
          }
        >
          <figure className="cardInfo__imgContainer">
            <img
              src={card.images.small}
              alt={card.name}
              className={
                card.rules || card.rarity
                  ? 'cardInfo__card'
                  : 'cardInfo__card cardInfo__card_fewInformation'
              }
            />
          </figure>
          <article
            className={
              card.rules || card.rarity
                ? 'cardInfo__description'
                : 'cardInfo__description cardInfo__description_fewInformation'
            }
          >
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
            {(card.rarity || card.rules) && (
              <>
                <div className="partingLine"></div>
                <section className="description__section">
                  {card.rules && (
                    <>
                      <h3 className="description__principal">Rules</h3>
                      {card.rules.map((rule, index) => (
                        <p
                          key={`${card.id}-${index}`}
                          className="description__text"
                        >
                          {rule}
                        </p>
                      ))}
                    </>
                  )}
                  <h3 className="description__principal">Rarity</h3>
                  <span className="description__text">{card.rarity}</span>
                </section>
              </>
            )}
            <div className="partingLine"></div>
            <section className="description__section">
              <h3 className="description__principal">Price</h3>
              {priceCard.includes('$') && (
                <h4 className="description__priceUpdate">
                  Last Updated{' '}
                  {card.tcgplayer.updatedAt ?? card.cardmarket.updatedAt}
                </h4>
              )}
              <span className="description__price">{priceCard}</span>
              {priceCard.includes('$') && (
                <button
                  className="buyButton"
                  onClick={() =>
                    addToCart({
                      alt: card.name,
                      id: card.id,
                      price: priceCard,
                      src: card.images.small,
                    })
                  }
                >
                  ADD TO CART
                </button>
              )}
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
