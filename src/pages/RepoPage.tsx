import { useParams } from 'react-router'
import { useRepoData } from '@hooks/useRepoData'
import Loading from '@components/Loading'
import ErrorPage from '@pages/ErrorPage'
import RepoDetails from '@components/RepoDetails'

function RepoPage() {
  const { username, reponame } = useParams()
  const { repo, loading, error, rateLimited } = useRepoData(username, reponame)

  if (loading) return <Loading />

  if (rateLimited || error || !repo)
    return (
      <ErrorPage message="Repositório não encontrado ou erro na requisição." />
    )

  return <RepoDetails repo={repo} />
}

export default RepoPage
