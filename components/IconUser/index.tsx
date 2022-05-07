import useShopping from 'hooks/useShopping'
import Link from 'next/link'
import { useState } from 'react'

function IconUser() {
  const [viewUserMenu, setViewUserMenu] = useState(false)
  const { shoppingState, toggleLog } = useShopping()

  const handleToggleUserMenu = () => {
    setViewUserMenu(!viewUserMenu)
  }
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
