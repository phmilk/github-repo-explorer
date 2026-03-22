import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SortHeader from '@features/repositories/components/RepoTable/SortHeader'
import type { SortColumn, SortDirection } from '@features/repositories/types'

function renderSortHeader(
  column: SortColumn = 'stargazers_count',
  currentSort: SortColumn = 'stargazers_count',
  currentDirection: SortDirection = 'desc',
  onSortChange = vi.fn()
) {
  return render(
    <table>
      <thead>
        <tr>
          <SortHeader
            label="Stars"
            column={column}
            currentSort={currentSort}
            currentDirection={currentDirection}
            onSortChange={onSortChange}
          />
        </tr>
      </thead>
    </table>
  )
}

describe('SortHeader', () => {
  it('renders the label', () => {
    renderSortHeader()
    expect(screen.getByText('Stars')).toBeInTheDocument()
  })

  it('sets aria-sort="descending" when active and desc', () => {
    const { container } = renderSortHeader(
      'stargazers_count',
      'stargazers_count',
      'desc'
    )
    expect(container.querySelector('th')).toHaveAttribute(
      'aria-sort',
      'descending'
    )
  })

  it('sets aria-sort="ascending" when active and asc', () => {
    const { container } = renderSortHeader(
      'stargazers_count',
      'stargazers_count',
      'asc'
    )
    expect(container.querySelector('th')).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
  })

  it('sets aria-sort="none" when not the active column', () => {
    const { container } = renderSortHeader(
      'stargazers_count',
      'forks_count',
      'desc'
    )
    expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'none')
  })

  it('toggles from desc to asc when active column is clicked', () => {
    const onSortChange = vi.fn()
    renderSortHeader(
      'stargazers_count',
      'stargazers_count',
      'desc',
      onSortChange
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onSortChange).toHaveBeenCalledWith('stargazers_count', 'asc')
  })

  it('toggles from asc to desc when active column is clicked', () => {
    const onSortChange = vi.fn()
    renderSortHeader(
      'stargazers_count',
      'stargazers_count',
      'asc',
      onSortChange
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onSortChange).toHaveBeenCalledWith('stargazers_count', 'desc')
  })

  it('activates with default direction when an inactive column is clicked', () => {
    const onSortChange = vi.fn()
    renderSortHeader('forks_count', 'stargazers_count', 'desc', onSortChange)
    fireEvent.click(screen.getByRole('button'))
    expect(onSortChange).toHaveBeenCalledWith('forks_count', 'desc')
  })
})
