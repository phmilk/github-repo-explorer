import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RepoPagination from '@shared/components/RepoPagination'
import type React from 'react'

function renderPagination(
  props: Partial<React.ComponentProps<typeof RepoPagination>> = {}
) {
  const defaults = {
    currentPage: 1,
    totalPages: 5,
    loading: false,
    onPageChange: vi.fn()
  }
  return render(<RepoPagination {...defaults} {...props} />)
}

/** Get the clickable <a> page-link elements (disabled items use <span>) */
function getPageLinks(container: HTMLElement) {
  return container.querySelectorAll('a.page-link')
}

describe('RepoPagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = renderPagination({ totalPages: 1 })
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when totalPages is 0', () => {
    const { container } = renderPagination({ totalPages: 0 })
    expect(container.firstChild).toBeNull()
  })

  it('renders pagination list when totalPages > 1', () => {
    const { container } = renderPagination({ totalPages: 3 })
    expect(container.querySelector('.pagination')).toBeInTheDocument()
  })

  it('renders page number items', () => {
    renderPagination({ currentPage: 1, totalPages: 3 })
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn()
    renderPagination({ currentPage: 1, totalPages: 3, onPageChange })
    fireEvent.click(screen.getByText('2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page when Next is clicked', () => {
    const onPageChange = vi.fn()
    const { container } = renderPagination({
      currentPage: 2,
      totalPages: 5,
      onPageChange
    })
    const links = getPageLinks(container)
    fireEvent.click(links[links.length - 2])
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with prev page when Prev is clicked', () => {
    const onPageChange = vi.fn()
    const { container } = renderPagination({
      currentPage: 3,
      totalPages: 5,
      onPageChange
    })
    const links = getPageLinks(container)
    fireEvent.click(links[1])
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with 1 when First is clicked', () => {
    const onPageChange = vi.fn()
    const { container } = renderPagination({
      currentPage: 4,
      totalPages: 5,
      onPageChange
    })
    const links = getPageLinks(container)
    fireEvent.click(links[0])
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange with last page when Last is clicked', () => {
    const onPageChange = vi.fn()
    const { container } = renderPagination({
      currentPage: 2,
      totalPages: 5,
      onPageChange
    })
    const links = getPageLinks(container)
    fireEvent.click(links[links.length - 1])
    expect(onPageChange).toHaveBeenCalledWith(5)
  })

  it('does not call onPageChange when page 1 buttons are disabled (loading)', () => {
    const onPageChange = vi.fn()
    renderPagination({
      currentPage: 1,
      totalPages: 5,
      loading: true,
      onPageChange
    })
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('renders ellipsis for pages far from current page', () => {
    const { container } = renderPagination({ currentPage: 5, totalPages: 10 })
    const ellipses = container.querySelectorAll(
      '.page-item.disabled span.page-link'
    )
    expect(ellipses.length).toBeGreaterThan(0)
  })
})
