import { useListItem } from '@hooks/useListItem'

function Watchers() {
  const { repo } = useListItem()

  return (
    <span className="badge bg-success text-white rounded-pill" title="Watchers">
      <i className="bi bi-eye-fill me-1"></i>
      {repo.watchers_count}
    </span>
  )
}

export default Watchers
