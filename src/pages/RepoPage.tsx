import { useParams, Link } from 'react-router'
import { useRepoData } from '@hooks/useRepoData'
import Loading from '@components/Loading'
import ErrorPage from '@pages/ErrorPage'
import RepoDetails from '@components/RepoDetails'

function RepoPage() {
  const { username, reponame } = useParams()
  const { repo, loading, error, rateLimited } = useRepoData(username, reponame)

  return (
    <div className="container-fluid px-0 py-4">
      <div className="mb-4">
        <Link to={`/user/${username}`} className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Voltar para {username}
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : rateLimited || error || !repo ? (
        <ErrorPage message="Repositório não encontrado ou erro na requisição." />
      ) : (
        <RepoDetails repo={repo} />
      )}
    </div>
  )
}

export default RepoPage
