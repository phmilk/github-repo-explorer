import { useRepoDetails } from '@hooks/useRepoDetails'

function Header() {
  const repo = useRepoDetails()

  return (
    <div className="card-header bg-light border-bottom-0 pt-4 pb-3 px-4">
      <h2 className="card-title fw-bold text-primary m-0">
        <i className="bi bi-journal-bookmark me-2"></i>
        {repo.name}
      </h2>
    </div>
  )
}

export default Header
