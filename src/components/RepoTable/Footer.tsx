import RepoPagination from '@components/RepoPagination'

interface FooterProps {
  currentPage: number
  totalPages: number
  totalRepos: number
  reposOnPage: number
  loading: boolean
  onPageChange: (page: number) => void
}

function Footer({
  currentPage,
  totalPages,
  totalRepos,
  reposOnPage,
  loading,
  onPageChange
}: FooterProps) {
  return (
    <div className="d-flex justify-content-between align-items-center gap-3 p-3 border-top flex-wrap">
      <RepoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={onPageChange}
      />
      <small className="text-muted">
        Página {currentPage} de {totalPages} ({reposOnPage}/{totalRepos}{' '}
        repositórios)
      </small>
    </div>
  )
}

export default Footer
