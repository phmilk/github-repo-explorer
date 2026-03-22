import { signOut } from 'firebase/auth'
import { auth } from '@lib/firebase'
import { clearToken } from '@api/auth'
import { useAuth } from '@hooks/useAuth'
import { useLoginModal } from '@hooks/useLoginModal'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

function UserMenu() {
  const { user } = useAuth()
  const { openModal } = useLoginModal()

  async function handleLogout() {
    clearToken()
    await signOut(auth)
  }

  if (!user) {
    return (
      <Button variant="outline-light" onClick={openModal}>
        Entrar
      </Button>
    )
  }

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="button"
        className="btn p-0 border-0 bg-transparent"
        aria-label={`Menu do usuário ${user.displayName}`}
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName ?? 'Usuário'}
            width={34}
            height={34}
            roundedCircle
          />
        ) : (
          <span className="text-light">{user.displayName}</span>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>{user.displayName}</Dropdown.Header>
        <Dropdown.Header>{user.email}</Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={handleLogout}>
          Sair
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserMenu
