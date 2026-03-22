import { useRepoDetails } from '@hooks/useRepoDetails'

function Issues() {
  const { open_issues_count } = useRepoDetails()

  return (
    <span className="badge bg-danger text-white fs-6 rounded-pill px-3 py-2">
      <i className="bi bi-exclamation-circle me-1"></i>
      {open_issues_count} Issues
    </span>
  )
}

export default Issues
