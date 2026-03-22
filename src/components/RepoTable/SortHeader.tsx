import type { SortDirection } from '@api/github'

export type SortColumn =
  | 'stargazers_count'
  | 'forks_count'
  | 'open_issues_count'
  | 'full_name'

interface SortHeaderProps {
  label: string
  column: SortColumn
  currentSort: SortColumn
  currentDirection: SortDirection
  defaultDirection?: SortDirection
  onSortChange: (column: SortColumn, direction: SortDirection) => void
}

function SortHeader({
  label,
  column,
  currentSort,
  currentDirection,
  defaultDirection = 'desc',
  onSortChange
}: SortHeaderProps) {
  const isActive = currentSort === column
  const ariaSort = isActive
    ? currentDirection === 'desc'
      ? 'descending'
      : 'ascending'
    : 'none'

  function handleClick() {
    if (isActive) {
      onSortChange(column, currentDirection === 'desc' ? 'asc' : 'desc')
    } else {
      onSortChange(column, defaultDirection)
    }
  }

  const chevron = isActive
    ? currentDirection === 'desc'
      ? 'bi-chevron-down'
      : 'bi-chevron-up'
    : 'bi-chevron-expand'

  return (
    <th scope="col" aria-sort={ariaSort} className="text-nowrap">
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-link p-0 text-reset text-decoration-none fw-semibold d-flex align-items-center gap-1"
      >
        {label}
        <i
          className={`bi ${chevron} small${isActive ? '' : ' opacity-25'}`}
          aria-hidden="true"
        />
      </button>
    </th>
  )
}

export default SortHeader
