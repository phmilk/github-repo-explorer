const PER_PAGE_OPTIONS = [10, 20, 30, 50, 100]

interface ToolbarProps {
  totalRepos: number
  perPage: number
  onPerPageChange: (perPage: number) => void
}

function Toolbar({ totalRepos, perPage, onPerPageChange }: ToolbarProps) {
  return (
    <div>
      <h2>
        Repositórios <small>({totalRepos})</small>
      </h2>
      <label htmlFor="per-page-select">Por página:</label>
      <select
        id="per-page-select"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
      >
        {PER_PAGE_OPTIONS.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Toolbar
