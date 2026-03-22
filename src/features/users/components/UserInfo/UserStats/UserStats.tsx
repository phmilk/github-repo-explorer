import type { User } from '@features/users/types'

interface UserStatsProps {
  user: User
  onClear: () => void
}

function UserStats({ user, onClear }: UserStatsProps) {
  return (
    <div className="d-flex align-items-center gap-3 ms-auto flex-shrink-0">
      <small>
        <strong>{user.followers.toLocaleString()}</strong>{' '}
        <span className="text-white">seguidores</span>
      </small>
      <small>
        <strong>{user.following.toLocaleString()}</strong>{' '}
        <span className="text-white">seguindo</span>
      </small>
      <button
        type="button"
        className="btn-close btn-close-white"
        aria-label="Limpar busca"
        onClick={onClear}
      />
    </div>
  )
}

export default UserStats
