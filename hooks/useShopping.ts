import { useContext } from 'react'
import { ShoppingCtx } from 'context/shopping'

function useShopping() {
  const {
    addToCart,
    amount,
    clearCart,
    expired,
    toggleLog,
    removeFromCart,
    state,
  } = useContext(ShoppingCtx)

  return {
    addToCart,
    amount,
    clearCart,
    expired,
    removeFromCart,
    shoppingState: state,
    toggleLog,
  }
}

export default useShopping
