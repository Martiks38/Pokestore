import Link from 'next/link'
import { cardData } from 'types/cardData'

function Card({ alt, loading, route, src, styleCard }: cardData) {
  return (
    <Link href={route}>
      <a>
        <img src={src} alt={alt} loading={loading} className={styleCard} />
      </a>
    </Link>
  )
}

export default Card
