import Pagination from 'react-bootstrap/Pagination'

interface RepoPaginationProps {
  currentPage: number
  totalPages: number
  loading: boolean
  onPageChange: (page: number) => void
}

function RepoPagination({
  currentPage,
  totalPages,
  loading,
  onPageChange
}: RepoPaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !loading) {
      onPageChange(page)
    }
  }

  if (totalPages <= 1) return null

  return (
    <Pagination className="m-0">
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || loading}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      />

      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1
        const isNear =
          Math.abs(pageNum - currentPage) <= 2 ||
          pageNum === 1 ||
          pageNum === totalPages

        if (!isNear && i > 0 && i < totalPages - 1) {
          if (i === 1) return <Pagination.Ellipsis key="ellipsis-start" disabled />
          if (i === totalPages - 2)
            return <Pagination.Ellipsis key="ellipsis-end" disabled />
          return null
        }

        return (
          <Pagination.Item
            key={pageNum}
            active={pageNum === currentPage}
            onClick={() => handlePageChange(pageNum)}
            disabled={loading}
          >
            {pageNum}
          </Pagination.Item>
        )
      })}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || loading}
      />
    </Pagination>
  )
}

export default RepoPagination
