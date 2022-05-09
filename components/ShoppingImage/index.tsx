import Image from 'next/image'
import Link from 'next/link'

function ShoppingImage({ purchaseStatus }: { purchaseStatus: boolean }) {
  const failed = {
    src: '/error.webp',
    alt: 'Purchase error',
    figMsg: 'An error occurred while processing the purchase',
    link: 'Go to the store',
    href: '/cart/payment',
  }

  const success = {
    src: '/thanks.webp',
    alt: 'Thank you so much',
    figMsg: 'Thank you for your purchase ❤️',
    link: 'Go Home',
    href: '/',
  }

  const msg = purchaseStatus ? success : failed

  return (
    <>
      <figure className="wrapperPurchaseMsg">
        <figure className="wrapperPurchaseMsg__img">
          <Image
            src={msg.src}
            alt={msg.alt}
            width={100}
            height={100}
            objectFit="contain"
            layout="responsive"
          />
        </figure>
        <figcaption className="wrapperPurchaseMsg__msg">
          {msg.figMsg}
        </figcaption>
      </figure>
      <Link href={msg.href}>
        <a className="purchaseBtn">{msg.link}</a>
      </Link>
    </>
  )
}

export default ShoppingImage
