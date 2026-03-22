import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Flag from '@features/repositories/components/RepoDetails/Info/Flag'

describe('Flag', () => {
  it('shows yes text and success style when active', () => {
    render(<Flag active={true} yes="Habilitadas" no="Desabilitadas" />)
    expect(screen.getByText('Habilitadas')).toBeInTheDocument()
    expect(screen.queryByText('Desabilitadas')).not.toBeInTheDocument()
  })

  it('shows no text and muted style when inactive', () => {
    render(<Flag active={false} yes="Habilitadas" no="Desabilitadas" />)
    expect(screen.getByText('Desabilitadas')).toBeInTheDocument()
    expect(screen.queryByText('Habilitadas')).not.toBeInTheDocument()
  })

  it('applies text-success class when active', () => {
    const { container } = render(<Flag active={true} yes="Sim" no="Não" />)
    expect(container.firstChild).toHaveClass('text-success')
  })

  it('applies text-muted class when inactive', () => {
    const { container } = render(<Flag active={false} yes="Sim" no="Não" />)
    expect(container.firstChild).toHaveClass('text-muted')
  })
})
