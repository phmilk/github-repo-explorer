import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { RepoInfo } from '@api/github'
import { getRepoInfo } from '@api/github'
import RepoPage from '@pages/RepoPage'

vi.mock('@api/github', () => ({
  getRepoInfo: vi.fn()
}))

vi.mock('@components/Loading', () => ({
  default: () => <div data-testid="loading" />
}))

vi.mock('@components/RepoDetails', () => ({
  default: ({ repo }: { repo: RepoInfo }) => (
    <div data-testid="repo-details">{repo.name}</div>
  )
}))

const mockRepo: RepoInfo = {
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
    vi.mocked(getRepoInfo).mockReturnValue(new Promise(() => {}))

    renderWithParams('testuser', 'test-repo')
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('renders back button with username', () => {
    vi.mocked(getRepoInfo).mockReturnValue(new Promise(() => {}))

    renderWithParams('testuser', 'test-repo')

    expect(
      screen.getByRole('link', { name: /Voltar para testuser/ })
    ).toHaveAttribute('href', '/user/testuser')
  })

  it('shows repo details on success', async () => {
    vi.mocked(getRepoInfo).mockResolvedValue({ data: mockRepo } as never)

    renderWithParams('testuser', 'test-repo')

    await waitFor(() =>
      expect(screen.getByTestId('repo-details')).toBeInTheDocument()
    )
    expect(screen.getByText('test-repo')).toBeInTheDocument()
  })

  it('shows error page on fetch failure', async () => {
    vi.mocked(getRepoInfo).mockRejectedValue(new Error('API error'))

    renderWithParams('testuser', 'test-repo')

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(
      screen.getByText('Repositório não encontrado ou erro na requisição.')
    ).toBeInTheDocument()
  })
})
