import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <header className="header">
      <Link href="/">
        <a className="logo">
          <Image
            src="/eevee.webp"
            alt="pokeshop"
            layout="intrinsic"
            width={32}
            height={32}
          />
        </a>
      </Link>
    </header>
  )
}

export default Header
