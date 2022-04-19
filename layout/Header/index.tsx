import Image from 'next/image'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Image
          src="/eevee.webp"
          alt="pokeshop"
          layout="intrinsic"
          width={32}
          height={32}
        />
      </div>
    </header>
  )
}

export default Header
