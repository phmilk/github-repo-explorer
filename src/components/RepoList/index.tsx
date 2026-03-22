import type { RepoInfo, SortOption, SortDirection } from '@api/github'
import RepoSortSelect from '@components/RepoSortSelect'
import RepoPagination from '@components/RepoPagination'
import ListItem from './ListItem'

interface RepoListProps {
  repos: RepoInfo[]
  username: string
  totalRepos: number
  currentPage: number
  totalPages: number
  sortOption: SortOption
  sortDirection: SortDirection
  loading: boolean
  onPageChange: (page: number) => void
  onSortOptionChange: (option: SortOption) => void
  onSortDirectionChange: (direction: SortDirection) => void
}

function RepoList({
  repos,
  username,
  totalRepos,
  currentPage,
  totalPages,
  sortOption,
  sortDirection,
  loading,
  onPageChange,
  onSortOptionChange,
  onSortDirectionChange
}: RepoListProps) {
  const handlePageChange = (page: number) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="w-100">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="m-0">
          Repositórios <span className="text-muted small">({totalRepos})</span>
        </h3>
        <RepoSortSelect
          sortOption={sortOption}
          sortDirection={sortDirection}
          onSortOptionChange={onSortOptionChange}
          onSortDirectionChange={onSortDirectionChange}
        />
      </div>

      <div className="list-group">
        {repos.map((repo) => (
          <ListItem key={repo.id} repo={repo} username={username} />
        ))}
        {repos.length === 0 && !loading && (
          <div className="text-center text-muted p-4 bg-white rounded shadow-sm">
            Nenhum repositório encontrado.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <RepoPagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default RepoList
