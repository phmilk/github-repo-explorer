import type { SortOption, SortDirection } from '@api/github'

interface RepoSortSelectProps {
  sortOption: SortOption
  sortDirection: SortDirection
  onSortOptionChange: (option: SortOption) => void
  onSortDirectionChange: (direction: SortDirection) => void
}

function RepoSortSelect({
  sortOption,
  sortDirection,
  onSortOptionChange,
  onSortDirectionChange
}: RepoSortSelectProps) {
  return (
    <div className="d-flex gap-2">
      <select
        className="form-select w-auto"
        value={sortOption}
        onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
        aria-label="Ordenar por"
      >
        <option value="updated">Atualizado</option>
        <option value="stars">Estrelas</option>
        <option value="forks">Forks</option>
        <option value="help-wanted-issues">Help Wanted Issues</option>
      </select>
      <select
        className="form-select w-auto"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}
        aria-label="Ordem"
      >
        <option value="desc">Decrescente</option>
        <option value="asc">Crescente</option>
      </select>
    </div>
  )
}

export default RepoSortSelect
