import { Link } from 'react-router'
import Badge from 'react-bootstrap/Badge'
import type { Repo } from '@api/github'

interface RepoHeaderProps {
  repo: Repo
}

function RepoHeader({ repo }: RepoHeaderProps) {
  return (
    <header className="d-flex flex-wrap align-items-center gap-3 py-2 px-3 border-bottom bg-dark-subtle">
      <Link
        to={`/user/${repo.owner.login}`}
        className="text-muted text-decoration-none flex-shrink-0"
        aria-label={`Voltar para ${repo.owner.login}`}
      >
        <i className="bi bi-arrow-left" aria-hidden="true" />
      </Link>

      <a
        href={repo.owner.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="d-flex align-items-center gap-3 flex-shrink-0 text-reset text-decoration-none"
      >
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          width={48}
          height={48}
          className="rounded-circle"
        />
        <div>
          <small className="text-muted d-block">{`@${repo.owner.login}`}</small>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="fw-semibold text-reset text-decoration-none"
              onClick={(e) => e.stopPropagation()}
            >
              {repo.name}
            </a>
            <Badge bg="secondary" className="fw-normal text-capitalize">
              {repo.visibility}
            </Badge>
            {repo.fork && (
              <Badge bg="secondary" className="fw-normal">
                Fork
              </Badge>
            )}
            {repo.archived && (
              <Badge bg="warning" text="dark" className="fw-normal">
                Arquivado
              </Badge>
            )}
          </div>
        </div>
      </a>
    </header>
  )
}

export default RepoHeader
