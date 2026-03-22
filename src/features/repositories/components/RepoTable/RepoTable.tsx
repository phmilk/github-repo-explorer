import Table from 'react-bootstrap/Table'
import type {
  Repo,
  SortDirection,
  SortColumn
} from '@features/repositories/types'
import Body from './Body'
import Footer from './Footer'
import SortHeader from './SortHeader'

interface RepoTableProps {
  repos: Repo[]
  totalRepos: number
  currentPage: number
  totalPages: number
  perPage: number
  sortColumn: SortColumn
  sortDirection: SortDirection
  loading: boolean
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  onSortChange: (column: SortColumn, direction: SortDirection) => void
}

function RepoTable({
  repos,
  totalRepos,
  currentPage,
  totalPages,
  perPage,
  sortColumn,
  sortDirection,
  loading,
  onPageChange,
  onPerPageChange,
  onSortChange
}: RepoTableProps) {
  return (
    <section aria-label="Repositórios">
      <Table
        hover
        responsive
        size="sm"
        className="mb-0"
        aria-label={`Lista de repositórios (${totalRepos} total)`}
      >
        <thead>
          <tr>
            <SortHeader
              label="Nome"
              column="full_name"
              currentSort={sortColumn}
              currentDirection={sortDirection}
              defaultDirection="asc"
              onSortChange={onSortChange}
            />
            <SortHeader
              label="Stars"
              column="stargazers_count"
              currentSort={sortColumn}
              currentDirection={sortDirection}
              onSortChange={onSortChange}
            />
            <SortHeader
              label="Forks"
              column="forks_count"
              currentSort={sortColumn}
              currentDirection={sortDirection}
              onSortChange={onSortChange}
            />
            <SortHeader
              label="Issues"
              column="open_issues_count"
              currentSort={sortColumn}
              currentDirection={sortDirection}
              onSortChange={onSortChange}
            />
          </tr>
        </thead>
        <Body repos={repos} />
      </Table>

      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        totalRepos={totalRepos}
        reposOnPage={repos.length}
        perPage={perPage}
        loading={loading}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
      />
    </section>
  )
}

export default RepoTable
