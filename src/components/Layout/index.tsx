import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Header />
      <main className='min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light p-4"'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
