import { useRepoDetails } from '@hooks/useRepoDetails'

function CreatedAt() {
  const { created_at } = useRepoDetails()

  return (
    <div className="col-sm-6 col-md-3">
      <div className="p-3 bg-light rounded h-100">
        <small className="text-muted d-block mb-1">Criado em</small>
        <span className="fw-bold fs-5">
          <i className="bi bi-calendar-plus me-2 text-primary"></i>
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default CreatedAt
