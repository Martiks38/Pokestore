import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import SearchForm from 'components/SearchForm'
import IconUser from 'components/IconUser'
import IconCart from 'components/IconCart'
import { $ } from 'utils/querySelector'

function Header() {
  const [viewSearchHeader, setviewSearchHeader] = useState(false)

  const router = useRouter()

  const handleViewSearchHeader = useCallback(() => {
    const isNarrow = window.innerWidth < 550
    const outHome = router.pathname !== '/'
    const $headerWrapper = $('.header__wrapper')

    if (outHome && !isNarrow) {
      setviewSearchHeader(true)
      $headerWrapper.classList.remove('header__wrapper_right')
      return
    }

    setviewSearchHeader(false)
    $headerWrapper.classList.add('header__wrapper_right')
  }, [router])

  useEffect(() => {
    handleViewSearchHeader()

    window.addEventListener('resize', handleViewSearchHeader)

    return () => window.removeEventListener('resize', handleViewSearchHeader)
  }, [handleViewSearchHeader])

  return (
    <header className="header">
      <Link href="/">
        <a className="logo">
          <Image
            src="/eevee.webp"
            alt="pokeshop"
            layout="fixed"
            width={32}
            height={32}
          />
        </a>
      </Link>
      <div className="header__wrapper">
        {viewSearchHeader && <SearchForm inHeader />}
        <div className="wrapper__user">
          <IconCart />
          <IconUser />
        </div>
      </div>
    </header>
  )
}

export default Header
