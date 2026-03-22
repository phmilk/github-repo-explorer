import { useUserCard } from '@hooks/useUserCard'

function UserName() {
  const { login } = useUserCard()
  return <p className="text-muted mb-3">@{login}</p>
}

export default UserName
