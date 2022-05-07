import { useContext } from 'react'
import { ShoppingCtx } from 'context/shopping'

function useShopping() {
  const { addToCart, amount, clearCart, toggleLog, removeFromCart, state } =
    useContext(ShoppingCtx)

  return {
    addToCart,
    amount,
    clearCart,
    removeFromCart,
    shoppingState: state,
    toggleLog,
  }
}

export default useShopping
