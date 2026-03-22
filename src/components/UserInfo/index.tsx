import { useNavigate } from 'react-router'
import type { User } from '@api/github'
import UserAvatar from './UserAvatar'
import UserStats from './UserStats'

interface UserInfoProps {
  user: User
}

function UserInfo({ user }: UserInfoProps) {
  const navigate = useNavigate()

  return (
    <article
      aria-label={`Perfil de ${user.login}`}
      className="d-flex flex-wrap align-items-center gap-3 py-2 px-3 border-bottom bg-primary text-white"
    >
      <UserAvatar user={user} />
      {user.bio && (
        <p className="mb-0 text-white text-truncate flex-grow-1 d-none d-lg-block">
          {user.bio}
        </p>
      )}
      <UserStats user={user} onClear={() => navigate('/')} />
    </article>
  )
}

export default UserInfo
