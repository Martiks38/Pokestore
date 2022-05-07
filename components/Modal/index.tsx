import { InitialUserCart } from 'interface/cart'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Modal({ shoppingState }: { shoppingState: InitialUserCart }) {
  const [viewMsg, setViewMsg] = useState(false)
  const router = useRouter()

  const handleBuy = () => {
    if (shoppingState.isConnected) {
      router.push('/cart/payment')
    } else {
      setViewMsg(!viewMsg)
    }
  }

  return (
    <>
      <button className="estimatedPrice__buy" onClick={handleBuy}>
        Buy
      </button>
      {viewMsg && (
        <aside className="modalCart">
          <div className="modalCart__msg">
            <p className="modalCart__text">
              To continue you need to be connected
            </p>
            <Link href="/login">
              <a className="modalCart__log">To Log In</a>
            </Link>
          </div>
        </aside>
      )}
    </>
  )
}

export default Modal
