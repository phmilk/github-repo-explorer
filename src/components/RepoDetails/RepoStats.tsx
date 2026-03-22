import type { Repo } from '@api/github'
import { formatSize } from './utils'

interface RepoStatsProps {
  repo: Repo
}

function RepoStats({ repo }: RepoStatsProps) {
  return (
    <div className="d-flex flex-wrap gap-3 mb-4 small">
      <span>
        <i className="bi bi-star me-1 text-muted" aria-hidden="true" />
        <strong>{repo.stargazers_count.toLocaleString()}</strong> stars
      </span>
      <span>
        <i className="bi bi-diagram-2 me-1 text-muted" aria-hidden="true" />
        <strong>{repo.forks_count.toLocaleString()}</strong> forks
      </span>
      <span>
        <i className="bi bi-eye me-1 text-muted" aria-hidden="true" />
        <strong>{repo.watchers_count.toLocaleString()}</strong> watchers
      </span>
      <span>
        <i
          className="bi bi-exclamation-circle me-1 text-muted"
          aria-hidden="true"
        />
        <strong>{repo.open_issues_count.toLocaleString()}</strong> issues
      </span>
      <span>
        <i className="bi bi-bell me-1 text-muted" aria-hidden="true" />
        <strong>{repo.subscribers_count.toLocaleString()}</strong> assinantes
      </span>
      <span>
        <i className="bi bi-hdd me-1 text-muted" aria-hidden="true" />
        {formatSize(repo.size)}
      </span>
    </div>
  )
}

export default RepoStats
