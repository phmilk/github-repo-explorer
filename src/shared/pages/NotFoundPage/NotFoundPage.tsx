import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="d-flex align-items-center justify-content-center h-100 px-3">
      <div className="text-center">
        <div className="mb-4">
          <div
            className="text-danger"
            style={{ fontSize: '4rem', fontWeight: 'bold' }}
          >
            404
          </div>
        </div>
        <h1 className="h3 mb-3 text-dark">Página não encontrada</h1>
        <p className="text-muted lead mb-4">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2" />
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
