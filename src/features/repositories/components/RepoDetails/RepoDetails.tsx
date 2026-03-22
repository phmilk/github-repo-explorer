import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import type { Repo } from '@features/repositories/types'
import Header from './Header'
import Stats from './Stats'
import Info from './Info'

interface RepoDetailsProps {
  repo: Repo
}

function RepoDetails({ repo }: RepoDetailsProps) {
  return (
    <div>
      <Header repo={repo} />

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

        <Stats repo={repo} />
        <Info repo={repo} />
      </article>
    </div>
  )
}

export default RepoDetails
