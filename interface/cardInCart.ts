export interface CardItem {
  alt?: string
  id?: string
  price?: string
  src?: string
}

export interface CardInCart extends CardItem {
  quantity: number
}
