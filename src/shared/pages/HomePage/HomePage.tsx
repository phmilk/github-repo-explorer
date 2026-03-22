function HomePage() {
  return (
    <div className="d-flex align-items-center justify-content-center h-100 px-3">
      <div className="text-center" style={{ maxWidth: '500px' }}>
        <div className="mb-4">
          <i className="bi bi-github text-dark" style={{ fontSize: '4rem' }} />
        </div>
        <h1 className="h3 mb-3 text-dark">Bem-vindo ao GitHub Repo Explorer</h1>
        <p className="text-muted lead">
          Utilize a barra de busca acima para procurar por usuários do GitHub e
          explorar seus repositórios.
        </p>
        <p className="text-muted small mt-4">
          Comece digitando um nome de usuário para descobrir projetos incríveis
        </p>
      </div>
    </div>
  )
}

export default HomePage
