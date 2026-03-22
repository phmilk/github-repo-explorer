import { Link } from 'react-router'
import Search from '../Search'
import UserMenu from './UserMenu'

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-github me-2" style={{ fontSize: '24px' }}></i>
          <span className="h5 mb-0">GitHub Repo Explorer</span>
        </Link>
        <div
          className="d-flex w-100 mt-2 mt-lg-0 gap-3 align-items-center"
          style={{ maxWidth: '400px' }}
        >
          <Search />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
