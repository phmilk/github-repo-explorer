import type { User } from '@features/users/types'

interface UserAvatarProps {
  user: User
}

function UserAvatar({ user }: UserAvatarProps) {
  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-flex align-items-center gap-3 flex-shrink-0 text-reset text-decoration-none"
    >
      <img
        src={user.avatar_url}
        alt={user.name || user.login}
        width={48}
        height={48}
        className="rounded-circle"
      />
      <div>
        <strong>{user.name || user.login}</strong>
        <small className="d-block text-white">@{user.login}</small>
      </div>
    </a>
  )
}

export default UserAvatar
