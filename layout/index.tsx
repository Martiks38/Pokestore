import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import ShoppingProvider from 'context/shopping'

function Layout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <>
      <ShoppingProvider>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </ShoppingProvider>
    </>
  )
}

export default Layout
