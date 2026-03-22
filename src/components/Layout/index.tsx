import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex flex-column align-items-center bg-light">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
