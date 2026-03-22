import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import NotFoundPage from '@pages/NotFoundPage'

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders "Página não encontrada"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument()
  })

  it('has link back to home', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', {
      name: /Voltar para a página inicial/
    })
    expect(link).toHaveAttribute('href', '/')
  })
})
