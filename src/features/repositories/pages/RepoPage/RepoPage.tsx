import { useParams } from 'react-router'
import { useRepoData } from '@features/repositories/hooks/useRepoData'
import Loading from '@shared/components/Loading'
import ErrorPage from '@shared/components/ErrorPage'
import RepoDetails from '@features/repositories/components/RepoDetails'

function RepoPage() {
  const { username, reponame } = useParams()
  const { repo, loading, error } = useRepoData(username, reponame)

  if (loading) return <Loading />

  if (error || !repo)
    return (
      <ErrorPage message="Repositório não encontrado ou erro na requisição." />
    )

  return <RepoDetails repo={repo} />
}

export default RepoPage
