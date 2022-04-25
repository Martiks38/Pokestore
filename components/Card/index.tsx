import Link from 'next/link'

function Card({
  alt,
  id,
  loading,
  src,
  style,
  styleCard,
}: {
  alt: string
  id: string
  loading?: 'eager' | 'lazy'
  src: string
  style?: string
  styleCard?: string
}) {
  return (
    <Link href={`/#`}>
      <a className={style}>
        <img src={src} alt={alt} loading={loading} className={styleCard} />
      </a>
    </Link>
  )
}

export default Card
