import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import ShoppingProvider from 'context/shopping'
import FormProvider from 'context/form'

function Layout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <>
      <ShoppingProvider>
        <Header />
        <FormProvider>
          <Main>{children}</Main>
        </FormProvider>
      </ShoppingProvider>
      <Footer />
    </>
  )
}

export default Layout
