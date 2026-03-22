import type { RepoInfo, SortOption, SortDirection } from '@api/github'
import Toolbar from './Toolbar'
import Body from './Body'
import Footer from './Footer'

interface RepoTableProps {
  repos: RepoInfo[]
  totalRepos: number
  currentPage: number
  totalPages: number
  perPage: number
  sortOption: SortOption
  sortDirection: SortDirection
  loading: boolean
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  onSortChange: (option: SortOption, direction: SortDirection) => void
}

interface SortHeaderProps {
  label: string
  column: SortOption
  currentSort: SortOption
  currentDirection: SortDirection
  onSortChange: (option: SortOption, direction: SortDirection) => void
  className?: string
}

function SortHeader({
  label,
  column,
  currentSort,
  currentDirection,
  onSortChange,
  className = ''
}: SortHeaderProps) {
  const isActive = currentSort === column

  function handleClick() {
    if (isActive) {
      onSortChange(column, currentDirection === 'desc' ? 'asc' : 'desc')
    } else {
      onSortChange(column, 'desc')
    }
  }

  return (
    <th
      onClick={handleClick}
      style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
      className={className}
    >
      {label}
      {isActive ? (
        <i
          className={`bi bi-chevron-${currentDirection === 'desc' ? 'down' : 'up'} ms-1`}
        />
      ) : (
        <i className="bi bi-chevron-down ms-1 opacity-25" />
      )}
    </th>
  )
}

function RepoTable({
  repos,
  totalRepos,
  currentPage,
  totalPages,
  perPage,
  sortOption,
  sortDirection,
  loading,
  onPageChange,
  onPerPageChange,
  onSortChange
}: RepoTableProps) {
  return (
    <div className="d-flex flex-column h-100 bg-white">
      <Toolbar
        totalRepos={totalRepos}
        perPage={perPage}
        onPerPageChange={onPerPageChange}
      />

      <div className="flex-grow-1 overflow-y-auto w-100">
        <table
          className="table table-hover table-sm m-0 w-100"
          style={{ tableLayout: 'fixed' }}
        >
          <colgroup>
            <col style={{ width: '34%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
          </colgroup>
          <thead className="table-light sticky-top">
            <tr>
              <SortHeader
                label="Nome"
                column="full_name"
                currentSort={sortOption}
                currentDirection={sortDirection}
                onSortChange={onSortChange}
              />
              <th className="text-center">Stars</th>
              <th className="text-center">Forks</th>
              <th className="text-center">Issues</th>
              <SortHeader
                label="Criado"
                column="created"
                currentSort={sortOption}
                currentDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-center"
              />
              <SortHeader
                label="Pushed"
                column="pushed"
                currentSort={sortOption}
                currentDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-center"
              />
              <SortHeader
                label="Atualizado"
                column="updated"
                currentSort={sortOption}
                currentDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-center"
              />
            </tr>
          </thead>
          <Body repos={repos} />
        </table>
      </div>

      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        totalRepos={totalRepos}
        reposOnPage={repos.length}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default RepoTable
