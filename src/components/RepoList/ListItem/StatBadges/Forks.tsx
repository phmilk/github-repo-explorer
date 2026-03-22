import { useListItem } from '@hooks/useListItem'

function Forks() {
  const { repo } = useListItem()

  return (
    <span className="badge bg-info text-dark rounded-pill" title="Forks">
      <i className="bi bi-diagram-2 me-1"></i>
      {repo.forks_count}
    </span>
  )
}

export default Forks
