import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ErrorPage from '@pages/ErrorPage'

describe('ErrorPage', () => {
  it('renders default message', () => {
    render(<ErrorPage />)
    expect(screen.getByText('Erro ao carregar os dados.')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<ErrorPage message="Usuário não encontrado." />)
    expect(screen.getByText('Usuário não encontrado.')).toBeInTheDocument()
  })

  it('has alert role', () => {
    render(<ErrorPage />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
