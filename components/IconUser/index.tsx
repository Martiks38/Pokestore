import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import useShopping from 'hooks/useShopping'
import { $ } from 'utils/querySelector'

function IconUser() {
  const [viewUserMenu, setViewUserMenu] = useState(false)
  const { shoppingState, toggleLog } = useShopping()

  const handleToggleUserMenu = () => {
    setViewUserMenu(!viewUserMenu)
    console.log(!viewUserMenu)
  }

  const toggleUserMenu = useCallback(
    (event: MouseEvent) => {
      const userIcon = $('.userIcon__img')
      const optionLogInOut = $('.userMenu__item')

      if (
        viewUserMenu &&
        !(event.target === userIcon || event.target === optionLogInOut)
      ) {
        setViewUserMenu(false)
      }
    },
    [viewUserMenu]
  )

  useEffect(() => {
    window.addEventListener('click', toggleUserMenu)

    return () => window.removeEventListener('click', toggleUserMenu)
  }, [toggleUserMenu])

  return (
    <>
      <button className="userIcon" onClick={handleToggleUserMenu}>
        <img
          src={shoppingState.isConnected ? '/userIcon.webp' : '/signOut.webp'}
          alt="profile image"
          className="userIcon__img"
        />
      </button>
      {viewUserMenu && (
        <div className="userMenu">
          {shoppingState.isConnected ? (
            <button className="userMenu__item" onClick={toggleLog}>
              Log Out
            </button>
          ) : (
            <Link href="/login">
              <a className="userMenu__item" onClick={handleToggleUserMenu}>
                Log In
              </a>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default IconUser
