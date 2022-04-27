import Link from 'next/link'

function Card({
  alt,
  loading,
  route,
  src,
  style,
  styleCard,
}: {
  alt: string
  loading?: 'eager' | 'lazy'
  route: string
  src: string
  style?: string
  styleCard?: string
}) {
  return (
    <Link href={route}>
      <a className={style}>
        <img src={src} alt={alt} loading={loading} className={styleCard} />
      </a>
    </Link>
  )
}

export default Card
