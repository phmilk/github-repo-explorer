import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import HomePage from '@shared/pages/HomePage'

describe('HomePage', () => {
  it('renders welcome heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(
      screen.getByText('Bem-vindo ao GitHub Repo Explorer')
    ).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Utilize a barra de busca/i)).toBeInTheDocument()
  })
})
