import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { User } from '@features/users/types'
import type { Repo } from '@features/repositories/types'
import { getUser } from '@features/users/services/userApi'
import { getUserRepos } from '@features/repositories/services/repoApi'
import UserPage from '@features/users/pages/UserPage'

vi.mock('@features/users/services/userApi', () => ({
  getUser: vi.fn()
}))

vi.mock('@features/repositories/services/repoApi', () => ({
  getUserRepos: vi.fn()
}))

vi.mock('@shared/components/Loading', () => ({
  default: () => <div data-testid="loading" />
}))

vi.mock('@features/users/components/UserInfo', () => ({
  default: ({ user }: { user: User }) => (
    <div data-testid="user-info">{user.login}</div>
  )
}))

vi.mock('@features/repositories/components/RepoTable', () => ({
  default: () => <div data-testid="repo-table" />,
  SortColumn: {}
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
    homepage: null,
    fork: false,
    archived: false,
    disabled: false,
    visibility: 'public',
    default_branch: 'main',
    topics: [],
    language: 'TypeScript',
    license: null,
    has_issues: true,
    has_discussions: false,
    stargazers_count: 10,
    forks_count: 2,
    open_issues_count: 1,
    watchers_count: 10,
    subscribers_count: 8,
    network_count: 1,
    size: 512,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
    pushed_at: '2024-06-01T00:00:00Z',
    owner: {
      login: 'testuser',
      avatar_url: 'https://avatar.test',
      html_url: 'https://github.com/testuser',
      type: 'User'
    }
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

  it('shows user info and repo table on success', async () => {
    vi.mocked(getUser).mockResolvedValue({ data: mockUser } as never)
    vi.mocked(getUserRepos).mockResolvedValue({ data: mockRepos } as never)

    renderWithUsername('testuser')

    await waitFor(() =>
      expect(screen.getByTestId('user-info')).toBeInTheDocument()
    )
    expect(screen.getByTestId('repo-table')).toBeInTheDocument()
  })

  it('shows user info and repo table when sorted by stars (triggers client-side sort)', async () => {
    vi.mocked(getUser).mockResolvedValue({ data: mockUser } as never)
    const twoRepos = [
      { ...mockRepos[0], id: 1, stargazers_count: 50 },
      { ...mockRepos[0], id: 2, name: 'second-repo', stargazers_count: 100 }
    ]
    vi.mocked(getUserRepos).mockResolvedValue({ data: twoRepos } as never)

    render(
      <MemoryRouter
        initialEntries={['/user/testuser?sort=stargazers_count&direction=asc']}
      >
        <Routes>
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getByTestId('user-info')).toBeInTheDocument()
    )
    expect(screen.getByTestId('repo-table')).toBeInTheDocument()
  })

  it('renders correctly when sort is full_name (skips client sort)', async () => {
    vi.mocked(getUser).mockResolvedValue({ data: mockUser } as never)
    vi.mocked(getUserRepos).mockResolvedValue({ data: mockRepos } as never)

    render(
      <MemoryRouter
        initialEntries={['/user/testuser?sort=full_name&direction=asc']}
      >
        <Routes>
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getByTestId('user-info')).toBeInTheDocument()
    )
    expect(screen.getByTestId('repo-table')).toBeInTheDocument()
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
