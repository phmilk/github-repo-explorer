import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router'
import Search from '../Search'
import UserMenu from './UserMenu'

function Header() {
  return (
    <Navbar
      as="header"
      bg="dark"
      data-bs-theme="dark"
      expand="md"
      sticky="top"
      className="flex-nowrap gap-2 p-2"
    >
      <Navbar.Brand as={Link} to="/">
        <i className="bi bi-github me-2" aria-hidden="true" />
        <span className="d-none d-md-inline">GitHub Repo Explorer</span>
      </Navbar.Brand>
      <div className="d-flex align-items-center gap-2 ms-auto">
        <Search />
        <UserMenu />
      </div>
    </Navbar>
  )
}

export default Header
