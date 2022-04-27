export type cardData = {
  alt: string
  loading?: 'eager' | 'lazy'
  route: string
  src: string
  styleCard?: string
}

export type cardDisplay = cardData & {
  price: string
  style: string
}
