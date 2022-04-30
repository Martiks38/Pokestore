import { TYPES } from 'reducer/shopping/actions'
import { CardItem } from './cardInCart'
import { InitialUserCart } from './cart'

interface Payload {
  prevState?: InitialUserCart
  cardItem?: CardItem
}

export interface ShoppingAction {
  type: TYPES
  payload?: Payload
}
