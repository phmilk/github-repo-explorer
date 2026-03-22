import { useListItem } from '@hooks/useListItem'

function Stars() {
  const { repo } = useListItem()

  return (
    <span className="badge bg-warning text-dark rounded-pill" title="Stars">
      <i className="bi bi-star-fill me-1"></i>
      {repo.stargazers_count}
    </span>
  )
}

export default Stars
