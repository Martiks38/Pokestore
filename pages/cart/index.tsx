import Link from 'next/link'
import useShopping from 'hooks/useShopping'
import UpButton from 'components/UpButton'
import ListItemDescription from 'components/ListItemDescription'
import Modal from 'components/Modal'

function Cart() {
  const { amount, clearCart, shoppingState } = useShopping()

  return (
    <>
      <div className="containerCenter">
        <h1 className="cartTitle">Your Shopping Cart</h1>
        <ListItemDescription />
        <div
          className={
            shoppingState.products[0]
              ? 'estimatedPrice'
              : 'estimatedPrice estimatedPrice_center'
          }
        >
          <span>Estimated Price {amount}</span>
          {shoppingState.products[0] && <Modal shoppingState={shoppingState} />}
        </div>
        <div className="panelBtnCart">
          <Link href="/search/page/1">
            <a className="panelBtnCart__btn">
              <span className="panelBtnCart__text">Continue Shopping</span>
            </a>
          </Link>
          {shoppingState.products[0] && (
            <button className="panelBtnCart__removeBtn" onClick={clearCart}>
              <span className="panelBtnCart__textRemoveBtn">
                Remove All Items
              </span>
            </button>
          )}
        </div>
        <UpButton />
      </div>
    </>
  )
}

export default Cart
