import { useRepoDetails } from '@hooks/useRepoDetails'

function Language() {
  const { language } = useRepoDetails()

  return (
    <div className="col-sm-6 col-md-3">
      <div className="p-3 bg-light rounded h-100">
        <small className="text-muted d-block mb-1">Linguagem Principal</small>
        {language ? (
          <span className="fw-bold fs-5">
            <i className="bi bi-code-slash me-2 text-primary"></i>
            {language}
          </span>
        ) : (
          <span className="text-muted fst-italic">Não especificada</span>
        )}
      </div>
    </div>
  )
}

export default Language
