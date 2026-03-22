const PER_PAGE_OPTIONS = [10, 20, 30, 50, 100]

interface ToolbarProps {
  totalRepos: number
  perPage: number
  onPerPageChange: (perPage: number) => void
}

function Toolbar({ totalRepos, perPage, onPerPageChange }: ToolbarProps) {
  return (
    <div className="d-flex justify-content-between align-items-center gap-3 p-3 border-bottom flex-wrap">
      <div className="d-flex align-items-baseline gap-2">
        <h5 className="m-0">Repositórios</h5>
        <small className="text-muted">({totalRepos})</small>
      </div>
      <div className="d-flex align-items-center gap-2">
        <label className="form-label m-0 small text-muted">Por página:</label>
        <select
          className="form-select form-select-sm w-auto"
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
    </div>
  )
}

export default Toolbar
