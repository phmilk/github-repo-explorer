import { useListItem } from '@hooks/useListItem'

function PushedAt() {
  const { repo } = useListItem()

  return (
    <span className="badge bg-light text-dark border">
      Pushed em {new Date(repo.pushed_at).toLocaleDateString()}
    </span>
  )
}

export default PushedAt
