import { useListItem } from '@hooks/useListItem'

function Size() {
  const { repo } = useListItem()

  return (
    <span className="badge bg-light text-dark border">
      <i className="bi bi-hdd me-1"></i>
      {repo.size} KB
    </span>
  )
}

export default Size
