import Card from 'components/Card'
import useShopping from 'hooks/useShopping'
import { CardDisplay } from 'interface/cardData'
import Link from 'next/link'

function CardItem({
  alt,
  id,
  loading,
  price,
  route,
  src,
  style,
  styleCard,
}: CardDisplay) {
  const { addToCart } = useShopping()

  return (
    <div className={`cardItemWrapper ${style}`}>
      <span className="cardItemWrapper__price">{price}</span>
      <Card
        alt={alt}
        loading={loading}
        route={route}
        src={src}
        styleCard={styleCard}
      />
      <div className="cardItemWrapper__panelBtn">
        <Link href={route}>
          <a className="panelBtnCard__btn">See more</a>
        </Link>
        <div className="divider"></div>
        <button
          disabled={!price.includes('$')}
          className="panelBtnCard__btn"
          onClick={() => {
            addToCart({ alt, id, price, src })
          }}
        >
          <svg width="20" height="20" focusable="false" viewBox="0 0 12 12">
            <path
              stroke="white"
              strokeLinecap="round"
              strokeWidth={2}
              d="M6 2v8m4-4H2"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CardItem
