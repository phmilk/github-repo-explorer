import { useListItem } from '@hooks/useListItem'

function Issues() {
  const { repo } = useListItem()

  return (
    <span
      className="badge bg-danger text-white rounded-pill"
      title="Open Issues"
    >
      <i className="bi bi-exclamation-circle me-1"></i>
      {repo.open_issues_count}
    </span>
  )
}

export default Issues
