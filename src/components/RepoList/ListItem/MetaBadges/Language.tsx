import { useListItem } from '@hooks/useListItem'

function Language() {
  const { repo } = useListItem()
  if (!repo.language) return null

  return (
    <span className="badge bg-secondary">
      <i className="bi bi-code-slash me-1"></i>
      {repo.language}
    </span>
  )
}

export default Language
