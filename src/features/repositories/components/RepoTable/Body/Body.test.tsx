import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect } from 'vitest'
import Body from '@features/repositories/components/RepoTable/Body'
import type { Repo } from '@features/repositories/types'

const makeRepo = (overrides: Partial<Repo> = {}): Repo => ({
  id: 1,
  name: 'test-repo',
  full_name: 'user/test-repo',
  html_url: 'https://github.com/user/test-repo',
  description: null,
  homepage: null,
  fork: false,
  archived: false,
  disabled: false,
  visibility: 'public',
  default_branch: 'main',
  topics: [],
  language: null,
  license: null,
  has_issues: true,
  has_discussions: false,
  stargazers_count: 5,
  forks_count: 1,
  open_issues_count: 0,
  watchers_count: 5,
  subscribers_count: 3,
  network_count: 1,
  size: 100,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  pushed_at: '2024-06-01T00:00:00Z',
  owner: {
    login: 'user',
    avatar_url: 'https://avatar.test',
    html_url: 'https://github.com/user',
    type: 'User'
  },
  ...overrides
})

function renderBody(repos: Repo[]) {
  return render(
    <MemoryRouter initialEntries={['/user/octocat']}>
      <Routes>
        <Route
          path="/user/:username"
          element={
            <table>
              <Body repos={repos} />
            </table>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('Body', () => {
  it('shows empty message when repos is empty', () => {
    renderBody([])
    expect(
      screen.getByText('Nenhum repositório encontrado.')
    ).toBeInTheDocument()
  })

  it('renders a row for each repo', () => {
    const repos = [
      makeRepo({ id: 1, name: 'alpha' }),
      makeRepo({ id: 2, name: 'beta' })
    ]
    renderBody(repos)
    expect(screen.getByText('alpha')).toBeInTheDocument()
    expect(screen.getByText('beta')).toBeInTheDocument()
  })
})
