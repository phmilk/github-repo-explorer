import { useUserCard } from '@hooks/useUserCard'

function Avatar() {
  const { avatar_url, name, login } = useUserCard()
  return (
    <img
      src={avatar_url}
      alt={name || login}
      className="rounded-circle mb-3 border border-3 border-white shadow-sm"
      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
    />
  )
}

export default Avatar
