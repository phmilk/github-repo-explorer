import type { RepoInfo } from '@api/github'
import { formatStars, formatDate } from './utils'

interface RowProps {
  repo: RepoInfo
}

function Row({ repo }: RowProps) {
  return (
    <tr>
      <td>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none d-block text-truncate"
        >
          <strong>{repo.name}</strong>
        </a>
      </td>
      <td className="text-center small">{formatStars(repo.stargazers_count)}</td>
      <td className="text-center small">{formatStars(repo.forks_count)}</td>
      <td className="text-center small">{repo.open_issues_count}</td>
      <td className="text-center small">{formatDate(repo.created_at)}</td>
      <td className="text-center small">{formatDate(repo.pushed_at)}</td>
      <td className="text-center small">{formatDate(repo.updated_at)}</td>
    </tr>
  )
}

export default Row
