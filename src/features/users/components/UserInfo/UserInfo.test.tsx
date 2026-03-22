import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import UserInfo from '@features/users/components/UserInfo'
import type { User } from '@features/users/types'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockUser: User = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://github.com/octocat.png',
  html_url: 'https://github.com/octocat',
  type: 'User',
  public_repos: 10,
  public_gists: 0,
  followers: 100,
  following: 50,
  name: 'The Octocat',
  bio: 'A fun user',
  location: null,
  blog: '',
  company: null,
  email: null
}

function renderUserInfo(user: User = mockUser) {
  return render(
    <MemoryRouter>
      <UserInfo user={user} />
    </MemoryRouter>
  )
}

describe('UserInfo', () => {
  it('renders user profile article with accessible label', () => {
    renderUserInfo()
    expect(
      screen.getByRole('article', { name: /Perfil de octocat/i })
    ).toBeInTheDocument()
  })

  it('shows the user display name', () => {
    renderUserInfo()
    expect(screen.getByText('The Octocat')).toBeInTheDocument()
  })

  it('shows the username handle', () => {
    renderUserInfo()
    expect(screen.getByText('@octocat')).toBeInTheDocument()
  })

  it('shows follower count', () => {
    renderUserInfo()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('shows following count', () => {
    renderUserInfo()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('shows bio when present', () => {
    renderUserInfo()
    expect(screen.getByText('A fun user')).toBeInTheDocument()
  })

  it('does not show bio paragraph when bio is null', () => {
    renderUserInfo({ ...mockUser, bio: null })
    expect(screen.queryByText('A fun user')).not.toBeInTheDocument()
  })

  it('navigates home when clear button is clicked', () => {
    renderUserInfo()
    fireEvent.click(screen.getByLabelText('Limpar busca'))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('uses login as avatar alt when name is null', () => {
    renderUserInfo({ ...mockUser, name: null })
    expect(screen.getByAltText('octocat')).toBeInTheDocument()
  })
})
