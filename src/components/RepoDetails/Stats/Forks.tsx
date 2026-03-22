import { useRepoDetails } from '@hooks/useRepoDetails'

function Forks() {
  const { forks_count } = useRepoDetails()

  return (
    <span className="badge bg-info text-dark fs-6 rounded-pill px-3 py-2">
      <i className="bi bi-diagram-2 me-1"></i>
      {forks_count} Forks
    </span>
  )
}

export default Forks
