import { useUserCard } from '@hooks/useUserCard'

function Name() {
  const { name, login } = useUserCard()
  return <h5 className="card-title fw-bold mb-1">{name || login}</h5>
}

export default Name
