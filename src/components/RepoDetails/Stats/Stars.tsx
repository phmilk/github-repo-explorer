import { useRepoDetails } from '@hooks/useRepoDetails'

function Stars() {
  const { stargazers_count } = useRepoDetails()

  return (
    <span className="badge bg-warning text-dark fs-6 rounded-pill px-3 py-2">
      <i className="bi bi-star-fill me-1"></i>
      {stargazers_count} Estrelas
    </span>
  )
}

export default Stars
