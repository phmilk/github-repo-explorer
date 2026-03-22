import { useListItem } from '@hooks/useListItem'

function UpdatedAt() {
  const { repo } = useListItem()
  return (
    <span className="badge bg-light text-dark border">
      Atualizado em {new Date(repo.updated_at).toLocaleDateString()}
    </span>
  )
}

export default UpdatedAt
