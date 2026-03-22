import { useListItem } from '@hooks/useListItem'

function CreatedAt() {
  const { repo } = useListItem()

  return (
    <span className="badge bg-light text-dark border">
      Criado em {new Date(repo.created_at).toLocaleDateString()}
    </span>
  )
}

export default CreatedAt
