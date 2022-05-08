import ShoppingImage from 'components/ShoppingImage'
import useShopping from 'hooks/useShopping'
import Head from 'next/head'
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
    <>
      <Head>
        <title>Purchase</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#202039" />
      </Head>
      <section className="wrapperPurchase">
        {process ? (
          <figure className="wrapperLoading">
            <img src="/loading.gif" alt="Loading..." className="loading" />
          </figure>
        ) : (
          <ShoppingImage purchaseStatus={purchaseStatus} />
        )}
      </section>
    </>
  )
}

export default SuccessfulPurchase
