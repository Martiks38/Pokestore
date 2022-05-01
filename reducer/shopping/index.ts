import { TYPES } from './actions'
import { InitialUserCart } from 'interface/cart'
import { ShoppingAction } from 'interface/shoppingAction'

export const shoppingInitialCart: InitialUserCart = {
  products: [],
  isConnected: false,
}

export function shoppingReducer(
  state: InitialUserCart,
  action: ShoppingAction
) {
  switch (action.type) {
    case TYPES.INIT_STORED: {
      return action.payload.prevState ?? shoppingInitialCart
    }

    case TYPES.ADD_TO_CART: {
      const itemInCart = state.products.find(
        (product) => product.id === action.payload.cardItem.id
      )

      const products = itemInCart
        ? state.products.map((product) =>
            product.id === itemInCart.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        : [...state.products, { ...action.payload, quantity: 1 }]

      return {
        ...state,
        products,
      }
    }

    case TYPES.CLEAR_CART: {
      return {
        ...state,
        products: shoppingInitialCart.products,
      }
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      let products = state.products.filter(
        (product) => product.id !== action.payload.cardItem.id
      )

      return {
        ...state,
        products,
      }
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      const itemInCart = state.products.find(
        (product) => product.id === action.payload.cardItem.id
      )

      let products =
        itemInCart.quantity !== 1
          ? state.products.map((product) =>
              product.id !== itemInCart.id
                ? product
                : { ...product, quantity: product.quantity - 1 }
            )
          : state.products.filter((product) => product.id !== itemInCart.id)

      return {
        ...state,
        products,
      }
    }

    case TYPES.TOGGLE_LOG: {
      return {
        ...state,
        isConnected: !state.isConnected,
      }
    }

    default:
      return state
  }
}
