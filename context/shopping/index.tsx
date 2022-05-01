import { createContext, useEffect, useReducer } from 'react'
import { shoppingInitialCart, shoppingReducer } from 'reducer/shopping'
import { TYPES } from 'reducer/shopping/actions'
import { CardItem } from 'interface/cardInCart'
import { ShoppingContext } from 'interface/shoppingContext'

export const ShoppingCtx = createContext<ShoppingContext | null>(null)

function ShoppingProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialCart)

  useEffect(() => {
    dispatch({
      type: TYPES.INIT_STORED,
      payload: { prevState: JSON.parse(localStorage.getItem('pokeStore')) },
    })
  }, [])

  useEffect(() => {
    if (state !== shoppingInitialCart)
      localStorage.setItem('pokeStore', JSON.stringify(state))
  }, [state])

  const addToCart = ({ alt, id, price, src }: CardItem) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: { cardItem: { alt, id, price, src } },
    })
  }

  const removeFromCart = (id: string, all = false) => {
    all
      ? dispatch({
          type: TYPES.REMOVE_ALL_FROM_CART,
          payload: { cardItem: { id } },
        })
      : dispatch({
          type: TYPES.REMOVE_ONE_FROM_CART,
          payload: { cardItem: { id } },
        })
  }

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART })
  }

  const toggleLog = () => {
    dispatch({ type: TYPES.TOGGLE_LOG })
  }

  return (
    <ShoppingCtx.Provider
      value={{ addToCart, clearCart, removeFromCart, state, toggleLog }}
    >
      {children}
    </ShoppingCtx.Provider>
  )
}

export default ShoppingProvider
