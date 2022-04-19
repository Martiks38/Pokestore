import Footer from './Footer'
import Header from './Header'
import Main from './Main'

function Layout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
