import { useContext } from 'react'
import { ShoppingCtx } from 'context/shopping'

function useShopping() {
  const { addToCart, clearCart, toggleLog, removeFromCart, state } =
    useContext(ShoppingCtx)

  return { addToCart, clearCart, removeFromCart, state, toggleLog }
}

export default useShopping
