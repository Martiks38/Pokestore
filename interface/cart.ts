import { CardInCart } from './cardInCart'

export interface InitialUserCart {
  products: CardInCart[]
  isConnected: boolean
  maxAge?: undefined | number
}
