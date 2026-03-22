import { Link, useParams } from 'react-router'
import type { Repo } from '@api/github'
import { formatStars } from './utils'

interface RowProps {
  repo: Repo
}

function Row({ repo }: RowProps) {
  const { username } = useParams()

  return (
    <tr className="position-relative">
      <td>
        <Link
          to={`/repo/${username}/${repo.name}`}
          className="stretched-link text-reset text-decoration-none"
        >
          {repo.name}
        </Link>
      </td>
      <td>{formatStars(repo.stargazers_count)}</td>
      <td>{formatStars(repo.forks_count)}</td>
      <td>{repo.open_issues_count}</td>
    </tr>
  )
}

export default Row
