import { useListItem } from '@hooks/useListItem'
import MetaBadges from './MetaBadges/index'

function Info() {
  const { repo } = useListItem()
  return (
    <div className="ms-2 me-auto text-start">
      <div className="fw-bold fs-5 text-primary">{repo.name}</div>
      {repo.description && (
        <div className="text-muted small mb-2">{repo.description}</div>
      )}
      <MetaBadges />
    </div>
  )
}

export default Info
