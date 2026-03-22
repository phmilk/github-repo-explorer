import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Página não encontrada</h2>
      <p className="text-muted fs-5 mb-4">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="btn btn-primary">
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export default NotFoundPage
