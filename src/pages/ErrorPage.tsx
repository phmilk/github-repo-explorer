interface ErrorPageProps {
  message?: string
}

function ErrorPage({ message = 'Erro ao carregar os dados.' }: ErrorPageProps) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )
}

export default ErrorPage
