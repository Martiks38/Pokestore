import Link from 'next/link'
import { CardData } from 'interface/cardData'

function Card({ alt, loading, route, src, style, styleCard }: CardData) {
  return (
    <Link href={route}>
      <a className={style}>
        <img src={src} alt={alt} loading={loading} className={styleCard} />
      </a>
    </Link>
  )
}

export default Card
