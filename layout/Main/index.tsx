import { useEffect } from 'react'
import useShopping from 'hooks/useShopping'

function Main({ children }: { children: JSX.Element | JSX.Element[] }) {
  const { expired, shoppingState } = useShopping()

  useEffect(() => {
    let isExpired = Date.now() > shoppingState.maxAge

    if (isExpired) {
      expired()
    }
  }, [expired, shoppingState])

  return <main>{children}</main>
}

export default Main
