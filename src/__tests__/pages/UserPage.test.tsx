import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { User, Repo } from '@api/github'
import { getUser, getUserRepos } from '@api/github'
import UserPage from '@pages/UserPage'

vi.mock('@api/github', () => ({
  getUser: vi.fn(),
  getUserRepos: vi.fn(),
  isRateLimitError: vi.fn()
}))

vi.mock('@components/Loading', () => ({
  default: () => <div data-testid="loading" />
}))

vi.mock('@components/UserInfo', () => ({
  default: ({ user }: { user: User }) => (
    <div data-testid="user-info">{user.login}</div>
  )
}))

vi.mock('@components/RepoList', () => ({
  default: ({ username }: { username: string }) => (
    <div data-testid="repo-list">{username}</div>
  )
}))

const mockUser: User = {
  login: 'testuser',
  id: 1,
  avatar_url: 'https://avatar.test',
  html_url: 'https://github.com/testuser',
  type: 'User',
  public_repos: 5,
  public_gists: 0,
  followers: 10,
  following: 5,
  name: 'Test User',
  bio: 'A test bio',
  location: null,
  blog: '',
  company: null,
  email: null
}

const mockRepos: Repo[] = [
  {
    id: 1,
    name: 'test-repo',
    full_name: 'testuser/test-repo',
    html_url: 'https://github.com/testuser/test-repo',
    description: 'A repo',
    stargazers_count: 10,
    language: 'TypeScript',
    forks_count: 2,
    open_issues_count: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
    pushed_at: '2024-06-01T00:00:00Z',
    size: 512,
    watchers_count: 10
  }
]

function renderWithUsername(username?: string) {
  if (!username) {
    return render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    )
  }
  return render(
    <MemoryRouter initialEntries={[`/user/${username}`]}>
      <Routes>
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('UserPage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading when no username param', () => {
    renderWithUsername()
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('shows loading while fetching', () => {
    vi.mocked(getUser).mockReturnValue(new Promise(() => {}))
    vi.mocked(getUserRepos).mockReturnValue(new Promise(() => {}))

    renderWithUsername('testuser')
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('shows user info and repo list on success', async () => {
    vi.mocked(getUser).mockResolvedValue({ data: mockUser } as never)
    vi.mocked(getUserRepos).mockResolvedValue({ data: mockRepos } as never)

    renderWithUsername('testuser')

    await waitFor(() =>
      expect(screen.getByTestId('user-info')).toBeInTheDocument()
    )
    expect(screen.getByTestId('repo-list')).toBeInTheDocument()
  })

  it('shows error page on fetch failure', async () => {
    vi.mocked(getUser).mockRejectedValue(new Error('API error'))
    vi.mocked(getUserRepos).mockRejectedValue(new Error('API error'))

    renderWithUsername('testuser')

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(
      screen.getByText('Usuário não encontrado ou erro na requisição.')
    ).toBeInTheDocument()
  })
})
