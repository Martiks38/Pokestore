import Card from 'components/Card'
import { cardDisplay } from 'interface/cardData'

function CardItem({
  alt,
  loading,
  price,
  route,
  src,
  style,
  styleCard,
}: cardDisplay) {
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
        <button
          className="panelBtnCard__btn"
          onClick={() => console.log('Ver más')}
        >
          See more
        </button>
        <div className="divider"></div>
        <button
          disabled={!price.includes('$')}
          className="panelBtnCard__btn"
          onClick={() => console.log('Añadir al carrito')}
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
