import { signOut } from 'firebase/auth'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { auth } from '@lib/firebase'
import { clearToken } from '@api/auth'
import { useAuth } from '@hooks/useAuth'
import { useLoginModal } from '@hooks/useLoginModal'

function UserMenu() {
  const { user } = useAuth()
  const { openModal } = useLoginModal()

  async function handleLogout() {
    clearToken()
    await signOut(auth)
  }

  function handleLogin() {
    openModal()
  }

  if (!user) {
    return (
      <Button
        variant="outline-light"
        size="sm"
        className="text-nowrap"
        onClick={handleLogin}
      >
        <i className="bi bi-box-arrow-in-right me-1"></i>
        Entrar
      </Button>
    )
  }

  return (
    <Dropdown align="end">
      <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }}>
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName ?? 'avatar'}
            width={34}
            height={34}
            roundedCircle
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <i
            className="bi bi-person-circle text-white"
            style={{ fontSize: '28px' }}
          ></i>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="mt-2">
        <div className="px-3 py-1">
          <span className="fw-semibold small d-block">{user.displayName}</span>
          <span className="text-muted small">{user.email}</span>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item
          as="button"
          className="text-danger"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Sair
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserMenu
