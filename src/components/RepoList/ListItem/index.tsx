import { useNavigate } from 'react-router'
import type { RepoInfo } from '@api/github'
import { ListItemProvider } from '@contexts/ListItemContext'
import Info from './Info'
import StatBadges from './StatBadges/index'

interface ListItemProps {
  repo: RepoInfo
  username: string
}

function ListItem({ repo, username }: ListItemProps) {
  const navigate = useNavigate()

  return (
    <ListItemProvider repo={repo} username={username}>
      <button
        onClick={() => navigate(`/repo/${username}/${repo.name}`)}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-start border-0 shadow-sm mb-2 rounded"
      >
        <Info />
        <StatBadges />
      </button>
    </ListItemProvider>
  )
}

export default ListItem
