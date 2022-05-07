import { CardInCart } from 'interface/cardInCart'

interface Itemdescription {
  product: CardInCart
  removeFromCart: (id: string, all?: boolean) => void
}

function ItemDescription({ product, removeFromCart }: Itemdescription) {
  return (
    <div className="wrapperItems">
      <article>
        <div className="item">
          <figure className="item__fig">
            <img src={product.src} alt="" className="fig__img" />
            <figcaption className="fig__name">{product.alt}</figcaption>
          </figure>
          <span className="item__price">{product.price}</span>
          <span className="item__quantity">{product.quantity}</span>
          <div className="item__remove">
            <button
              className="removeBtn"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
            <button
              className="removeBtn"
              onClick={() => removeFromCart(product.id, true)}
            >
              Remove All
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ItemDescription
