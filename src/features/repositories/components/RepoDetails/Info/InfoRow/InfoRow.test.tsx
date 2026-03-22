import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import InfoRow from '@features/repositories/components/RepoDetails/Info/InfoRow'

describe('InfoRow', () => {
  it('renders the label', () => {
    render(<InfoRow label="Linguagem">TypeScript</InfoRow>)
    expect(screen.getByText('Linguagem')).toBeInTheDocument()
  })

  it('renders the children value', () => {
    render(<InfoRow label="Linguagem">TypeScript</InfoRow>)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders children as React nodes', () => {
    render(
      <InfoRow label="Branch">
        <code>main</code>
      </InfoRow>
    )
    expect(screen.getByText('main').tagName).toBe('CODE')
  })
})
