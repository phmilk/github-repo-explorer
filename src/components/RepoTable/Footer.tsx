import Form from 'react-bootstrap/Form'
import RepoPagination from '@components/RepoPagination'

const PER_PAGE_OPTIONS = [10, 20, 30, 50, 100]

interface FooterProps {
  currentPage: number
  totalPages: number
  totalRepos: number
  reposOnPage: number
  perPage: number
  loading: boolean
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

function Footer({
  currentPage,
  totalPages,
  totalRepos,
  reposOnPage,
  perPage,
  loading,
  onPageChange,
  onPerPageChange
}: FooterProps) {
  return (
    <div className="d-flex align-items-center flex-wrap gap-2 py-2 px-1">
      <Form.Select
        size="sm"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        aria-label="Repositórios por página"
        className="w-auto"
      >
        {PER_PAGE_OPTIONS.map((n) => (
          <option key={n} value={n}>
            {n} / página
          </option>
        ))}
      </Form.Select>

      <RepoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={onPageChange}
      />

      <small className="ms-auto text-muted text-nowrap">
        {reposOnPage}/{totalRepos} repos · pág. {currentPage}/{totalPages}
      </small>
    </div>
  )
}

export default Footer
