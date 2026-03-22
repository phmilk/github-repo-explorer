import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import type { Repo } from '@api/github'
import RepoHeader from './RepoHeader'
import RepoStats from './RepoStats'
import RepoInfo from './RepoInfo'

interface RepoDetailsProps {
  repo: Repo
}

function RepoDetails({ repo }: RepoDetailsProps) {
  return (
    <div>
      <RepoHeader repo={repo} />

      <article className="p-3 p-md-4">
        {repo.description && (
          <p className="text-muted mb-3">{repo.description}</p>
        )}

        {repo.topics.length > 0 && (
          <Stack direction="horizontal" gap={1} className="flex-wrap mb-3">
            {repo.topics.map((topic) => (
              <Badge key={topic} bg="primary" className="fw-normal">
                {topic}
              </Badge>
            ))}
          </Stack>
        )}

        <RepoStats repo={repo} />
        <RepoInfo repo={repo} />
      </article>
    </div>
  )
}

export default RepoDetails
