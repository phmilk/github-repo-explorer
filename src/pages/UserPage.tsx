import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useReposPaginated } from '@hooks/useReposPaginated'
import UserInfo from '@components/UserInfo'
import RepoTable from '@components/RepoTable'
import Loading from '@components/Loading'
import ErrorPage from '@pages/ErrorPage'

function UserPage() {
  const { username } = useParams()
  const {
    user,
    repos,
    currentPage,
    perPage,
    sort,
    direction,
    totalRepos,
    totalPages,
    loading,
    error,
    rateLimitMessage,
    setCurrentPage,
    setPerPage,
    setSort
  } = useReposPaginated(username)

  const sortedRepos = useMemo(() => {
    if (sort === 'full_name') return repos

    const arr = [...repos]
    arr.sort((a, b) => {
      const [aVal, bVal] = [a[sort], b[sort]]
      return direction === 'desc' ? bVal - aVal : aVal - bVal
    })
    return arr
  }, [repos, sort, direction])

  if (loading) return <Loading />

  if (error || !user)
    return (
      <ErrorPage
        message={
          rateLimitMessage ?? 'Usuário não encontrado ou erro na requisição.'
        }
      />
    )

  return (
    <>
      <UserInfo user={user} />
      <RepoTable
        repos={sortedRepos}
        totalRepos={totalRepos}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        sortColumn={sort}
        sortDirection={direction}
        loading={loading}
        onPageChange={setCurrentPage}
        onPerPageChange={setPerPage}
        onSortChange={setSort}
      />
    </>
  )
}

export default UserPage
