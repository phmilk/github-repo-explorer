import type { RepoInfo } from '@api/github'
import Row from './Row'

interface BodyProps {
  repos: RepoInfo[]
}

function Body({ repos }: BodyProps) {
  if (repos.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={7}>
            <div className="d-flex align-items-center justify-content-center p-5 text-muted">
              Nenhum repositório encontrado.
            </div>
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {repos.map((repo) => (
        <Row key={repo.id} repo={repo} />
      ))}
    </tbody>
  )
}

export default Body
