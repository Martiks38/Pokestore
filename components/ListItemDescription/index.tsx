import useShopping from 'hooks/useShopping'
import ItemDescription from 'components/ItemDesciption'

function ListItemDescription() {
  const { removeFromCart, shoppingState } = useShopping()

  return (
    <>
      {shoppingState.products[0] ? (
        shoppingState.products.map((product) => (
          <ItemDescription
            key={product.id}
            product={product}
            removeFromCart={removeFromCart}
          />
        ))
      ) : (
        <div className="wrapperItems">
          <p className="wrapperItems__noProducts">
            There is no product selected
          </p>
        </div>
      )}
    </>
  )
}

export default ListItemDescription
