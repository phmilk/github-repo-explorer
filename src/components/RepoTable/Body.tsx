import type { Repo } from '@api/github'
import Row from './Row'

interface BodyProps {
  repos: Repo[]
}

function Body({ repos }: BodyProps) {
  if (repos.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={4}>Nenhum repositório encontrado.</td>
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
