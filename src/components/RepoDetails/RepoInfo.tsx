import type { Repo } from '@api/github'
import { formatDate } from './utils'
import InfoRow from './InfoRow'
import Flag from './Flag'

interface RepoInfoProps {
  repo: Repo
}

function RepoInfo({ repo }: RepoInfoProps) {
  return (
    <div className="small">
      {repo.language && <InfoRow label="Linguagem">{repo.language}</InfoRow>}
      {repo.license && <InfoRow label="Licença">{repo.license.name}</InfoRow>}
      <InfoRow label="Branch padrão">
        <code>{repo.default_branch}</code>
      </InfoRow>
      {repo.homepage && (
        <InfoRow label="Homepage">
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-truncate d-block"
          >
            {repo.homepage}
          </a>
        </InfoRow>
      )}
      <InfoRow label="Issues">
        <Flag active={repo.has_issues} yes="Habilitadas" no="Desabilitadas" />
      </InfoRow>
      <InfoRow label="Discussions">
        <Flag
          active={repo.has_discussions}
          yes="Habilitadas"
          no="Desabilitadas"
        />
      </InfoRow>
      <InfoRow label="Rede">{repo.network_count} repositórios</InfoRow>
      <InfoRow label="Criado em">{formatDate(repo.created_at)}</InfoRow>
      <InfoRow label="Atualizado em">{formatDate(repo.updated_at)}</InfoRow>
      <InfoRow label="Último push">{formatDate(repo.pushed_at)}</InfoRow>
    </div>
  )
}

export default RepoInfo
