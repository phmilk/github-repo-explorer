import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Repo } from '@features/repositories/types'
import { getRepo } from '@features/repositories/services/repoApi'
import RepoPage from '@features/repositories/pages/RepoPage'

vi.mock('@features/repositories/services/repoApi', () => ({
  getRepo: vi.fn()
}))

vi.mock('@shared/components/Loading', () => ({
  default: () => <div data-testid="loading" />
}))

vi.mock('@features/repositories/components/RepoDetails', () => ({
  default: ({ repo }: { repo: Repo }) => (
    <div data-testid="repo-details">{repo.name}</div>
  )
}))

const mockRepo: Repo = {
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

function renderWithParams(username?: string, reponame?: string) {
  if (!username || !reponame) {
    return render(
      <MemoryRouter>
        <RepoPage />
      </MemoryRouter>
    )
  }
  return render(
    <MemoryRouter initialEntries={[`/repo/${username}/${reponame}`]}>
      <Routes>
        <Route path="/repo/:username/:reponame" element={<RepoPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('RepoPage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading when no params', () => {
    renderWithParams()
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('shows loading while fetching', () => {
    vi.mocked(getRepo).mockReturnValue(new Promise(() => {}))

    renderWithParams('testuser', 'test-repo')
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('shows repo details on success', async () => {
    vi.mocked(getRepo).mockResolvedValue({ data: mockRepo } as never)

    renderWithParams('testuser', 'test-repo')

    await waitFor(() =>
      expect(screen.getByTestId('repo-details')).toBeInTheDocument()
    )
    expect(screen.getByText('test-repo')).toBeInTheDocument()
  })

  it('shows error page on fetch failure', async () => {
    vi.mocked(getRepo).mockRejectedValue(new Error('API error'))

    renderWithParams('testuser', 'test-repo')

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(
      screen.getByText('Repositório não encontrado ou erro na requisição.')
    ).toBeInTheDocument()
  })
})
