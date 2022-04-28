import Link from 'next/link'
import { cardData } from 'interface/cardData'

function Card({ alt, loading, route, src, style, styleCard }: cardData) {
  return (
    <Link href={route}>
      <a className={style}>
        <img src={src} alt={alt} loading={loading} className={styleCard} />
      </a>
    </Link>
  )
}

export default Card
