export interface CardData {
  alt: string
  loading?: 'eager' | 'lazy'
  route: string
  src: string
  style?: string
  styleCard?: string
}

export interface CardDisplay extends CardData {
  id: string
  price: string
}
