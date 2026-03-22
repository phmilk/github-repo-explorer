import { useParams } from 'react-router'
import { useReposPaginated } from '@hooks/useReposPaginated'
import UserCard from '@components/UserCard'
import RepoTable from '@components/RepoTable'
import Loading from '@components/Loading'
import ErrorPage from '@pages/ErrorPage'

function UserPage() {
  const { username } = useParams()
  const {
    userInfo,
    repos,
    currentPage,
    perPage,
    sortOption,
    sortDirection,
    totalRepos,
    totalPages,
    loading,
    error,
    rateLimited,
    setCurrentPage,
    setPerPage,
    setSort
  } = useReposPaginated(username)

  const tableProps = {
    repos,
    totalRepos,
    currentPage,
    totalPages,
    perPage,
    sortOption,
    sortDirection,
    loading,
    onPageChange: setCurrentPage,
    onPerPageChange: setPerPage,
    onSortChange: setSort
  }

  return (
    <div
      className="d-flex flex-column overflow-hidden"
      style={{ height: 'calc(100vh - 5.5rem)' }}
    >
      {loading && !userInfo ? (
        <Loading />
      ) : userInfo ? (
        <>
          <div
            className="d-none d-lg-grid gap-3 p-3 bg-light overflow-hidden h-100"
            style={{ gridTemplateColumns: '280px 1fr' }}
          >
            <aside className="overflow-y-auto overflow-x-hidden h-100">
              <UserCard user={userInfo} />
            </aside>
            <main className="d-flex flex-column overflow-hidden">
              <RepoTable {...tableProps} />
            </main>
          </div>
          <div className="d-lg-none d-flex flex-column gap-3 p-3 h-100 overflow-hidden">
            <UserCard user={userInfo} />
            <RepoTable {...tableProps} />
          </div>
        </>
      ) : rateLimited || error ? (
        <ErrorPage message="Usuário não encontrado ou erro na requisição." />
      ) : null}
    </div>
  )
}

export default UserPage
