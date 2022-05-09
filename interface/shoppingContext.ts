import { CardItem } from './cardInCart'
import { InitialUserCart } from './cart'

export interface ShoppingContext {
  state: InitialUserCart
  addToCart: ({}: CardItem) => void
  amount: string
  expired: () => void
  removeFromCart: (id: string, all?: boolean) => void
  clearCart: () => void
  toggleLog: () => void
}
