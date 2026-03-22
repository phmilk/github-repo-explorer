import { useRepoDetails } from '@hooks/useRepoDetails'

function Watchers() {
  const { watchers_count } = useRepoDetails()

  return (
    <span className="badge bg-success text-white fs-6 rounded-pill px-3 py-2">
      <i className="bi bi-eye-fill me-1"></i>
      {watchers_count} Watchers
    </span>
  )
}

export default Watchers
