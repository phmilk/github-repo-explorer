import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loading from '@shared/components/Loading'

describe('Loading', () => {
  it('renders loading text', () => {
    render(<Loading />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('has live region for accessibility', () => {
    render(<Loading />)
    const region = screen.getByRole('status')
    expect(region).toBeInTheDocument()
  })
})
