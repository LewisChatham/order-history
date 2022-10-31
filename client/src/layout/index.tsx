import { PropsWithChildren } from 'react'
import useGetOrders from 'src/hooks/useGetOrders'
import Navigation from './Navigation'

const Layout = ({children}: PropsWithChildren) => {

  return (
    <>
      <Navigation />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout