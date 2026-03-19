import Search from '../Serach'

function Header() {
  return (
    <header className="navbar bd-navbar sticky-top bg-dark text-white display-flex justify-content-between p-3">
      <div>
        <i className="bi bi-github" style={{ fontSize: '24px' }}></i>
        <span className="ms-2 h5 mb-0">GitHub Explorer</span>
      </div>
      <Search />
    </header>
  )
}

export default Header
