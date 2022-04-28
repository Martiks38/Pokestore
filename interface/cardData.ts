export interface cardData {
  alt: string
  loading?: 'eager' | 'lazy'
  route: string
  src: string
  style?: string
  styleCard?: string
}

export interface cardDisplay extends cardData {
  price: string
  style: string
}
