import { useRepoDetails } from '@hooks/useRepoDetails'

function Size() {
  const { size } = useRepoDetails()

  return (
    <span className="badge bg-secondary text-white fs-6 rounded-pill px-3 py-2">
      <i className="bi bi-hdd me-1"></i>
      {size} KB
    </span>
  )
}

export default Size
