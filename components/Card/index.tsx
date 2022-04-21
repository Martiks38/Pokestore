import Image from 'next/image'
import Link from 'next/link'

function Card({
  alt,
  id,
  src,
  style,
}: {
  alt: string
  id: string
  src: string
  style: string
}) {
  return (
    <Link href={`/#`}>
      <a className={style}>
        <Image
          src={src}
          alt={alt}
          // Small card size 245x342
          width={245}
          height={342}
          layout="intrinsic"
        />
      </a>
    </Link>
  )
}

export default Card
