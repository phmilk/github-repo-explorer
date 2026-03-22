import { useRepoDetails } from '@hooks/useRepoDetails'

function Footer() {
  const repo = useRepoDetails()

  return (
    <div className="card-footer bg-light border-top-0 p-4">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-dark"
      >
        <i className="bi bi-github me-2"></i>
        Ver no GitHub
      </a>
    </div>
  )
}

export default Footer
