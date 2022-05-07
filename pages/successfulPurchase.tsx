import ShoppingImage from 'components/ShoppingImage'
import useShopping from 'hooks/useShopping'
import { useEffect, useRef, useState } from 'react'

function SuccessfulPurchase() {
  const [process, setProcess] = useState(true)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const isOkay = useRef(Math.random() > 0.5)

  const { clearCart } = useShopping()

  useEffect(() => {
    const timeCheck = setTimeout(() => {
      setProcess(false)

      setPurchaseStatus(isOkay.current)
      if (isOkay.current) clearCart()
    }, 500)

    return () => clearTimeout(timeCheck)
  }, [isOkay, clearCart])

  return (
    <section className="wrapperPurchase">
      {process ? (
        <figure className="wrapperLoading">
          <img src="/loading.gif" alt="Loading..." className="loading" />
        </figure>
      ) : (
        <ShoppingImage purchaseStatus={purchaseStatus} />
      )}
    </section>
  )
}

export default SuccessfulPurchase
