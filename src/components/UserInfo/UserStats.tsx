import type { User } from '@api/github'

interface UserStatsProps {
  user: User
  onClear: () => void
}

function UserStats({ user, onClear }: UserStatsProps) {
  return (
    <div className="d-flex align-items-center gap-3 ms-auto flex-shrink-0">
      <small>
        <strong>{user.followers}</strong>{' '}
        <span className="text-white">seguidores</span>
      </small>
      <small>
        <strong>{user.following}</strong>{' '}
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
