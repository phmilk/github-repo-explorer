interface ErrorPageProps {
  message?: string
}

function ErrorPage({ message = 'Erro ao carregar os dados.' }: ErrorPageProps) {
  return (
    <div className="d-flex align-items-center justify-content-center h-100 px-3">
      <div className="text-center">
        <div className="mb-4">
          <i
            className="bi bi-exclamation-triangle text-warning"
            style={{ fontSize: '4rem' }}
          />
        </div>
        <h2 className="h4 mb-3 text-dark">Oops! Algo deu errado</h2>
        <p className="text-muted lead mb-0">{message}</p>
      </div>
    </div>
  )
}

export default ErrorPage
