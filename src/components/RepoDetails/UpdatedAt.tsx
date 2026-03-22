import { useRepoDetails } from '@hooks/useRepoDetails'

function UpdatedAt() {
  const { updated_at } = useRepoDetails()

  return (
    <div className="col-sm-6 col-md-3">
      <div className="p-3 bg-light rounded h-100">
        <small className="text-muted d-block mb-1">Última Atualização</small>
        <span className="fw-bold fs-5">
          <i className="bi bi-clock-history me-2 text-primary"></i>
          {new Date(updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default UpdatedAt
