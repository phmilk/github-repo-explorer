import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ErrorPage from '@shared/components/ErrorPage'

describe('ErrorPage', () => {
  it('renders default message', () => {
    render(<ErrorPage />)
    expect(screen.getByText('Erro ao carregar os dados.')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<ErrorPage message="Custom error message" />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('has alert role', () => {
    render(<ErrorPage />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
