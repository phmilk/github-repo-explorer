import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import Search from '@shared/components/Layout/Header/Search'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

function renderSearch(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<Search />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Search', () => {
  it('renders the search input', () => {
    renderSearch()
    expect(screen.getByPlaceholderText('Buscar usuário...')).toBeInTheDocument()
  })

  it('renders the search button', () => {
    renderSearch()
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument()
  })

  it('pre-fills with username param when on user route', () => {
    renderSearch('/user/octocat')
    expect(screen.getByDisplayValue('octocat')).toBeInTheDocument()
  })

  it('navigates to user page on valid submit', () => {
    renderSearch()
    fireEvent.change(screen.getByPlaceholderText('Buscar usuário...'), {
      target: { value: 'octocat' }
    })
    fireEvent.submit(screen.getByRole('search'))
    expect(mockNavigate).toHaveBeenCalledWith('/user/octocat')
  })

  it('navigates to home when submitting empty input', () => {
    renderSearch()
    fireEvent.submit(screen.getByRole('search'))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('trims whitespace from username before navigating', () => {
    renderSearch()
    fireEvent.change(screen.getByPlaceholderText('Buscar usuário...'), {
      target: { value: '  torvalds  ' }
    })
    fireEvent.submit(screen.getByRole('search'))
    expect(mockNavigate).toHaveBeenCalledWith('/user/torvalds')
  })
})
