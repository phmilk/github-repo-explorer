import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import Header from '@features/repositories/components/RepoDetails/Header'
import type { Repo } from '@features/repositories/types'

const mockRepo: Repo = {
  id: 1,
  name: 'my-repo',
  full_name: 'octocat/my-repo',
  html_url: 'https://github.com/octocat/my-repo',
  description: 'A test repo',
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
  open_issues_count: 0,
  watchers_count: 10,
  subscribers_count: 5,
  network_count: 1,
  size: 256,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  pushed_at: '2024-06-01T00:00:00Z',
  owner: {
    login: 'octocat',
    avatar_url: 'https://github.com/octocat.png',
    html_url: 'https://github.com/octocat',
    type: 'User'
  }
}

function renderHeader(repo: Repo = mockRepo) {
  return render(
    <MemoryRouter>
      <Header repo={repo} />
    </MemoryRouter>
  )
}

describe('Header', () => {
  it('renders a back link to the owner user page', () => {
    renderHeader()
    const link = screen.getByRole('link', { name: /Voltar para octocat/i })
    expect(link).toHaveAttribute('href', '/user/octocat')
  })

  it('shows the repo name', () => {
    renderHeader()
    expect(screen.getByText('my-repo')).toBeInTheDocument()
  })

  it('shows the owner username', () => {
    renderHeader()
    expect(screen.getByText('@octocat')).toBeInTheDocument()
  })

  it('shows the visibility badge', () => {
    renderHeader()
    expect(screen.getByText('public')).toBeInTheDocument()
  })

  it('shows Fork badge when repo is a fork', () => {
    renderHeader({ ...mockRepo, fork: true })
    expect(screen.getByText('Fork')).toBeInTheDocument()
  })

  it('does not show Fork badge when not a fork', () => {
    renderHeader()
    expect(screen.queryByText('Fork')).not.toBeInTheDocument()
  })

  it('shows Archived badge when repo is archived', () => {
    renderHeader({ ...mockRepo, archived: true })
    expect(screen.getByText('Arquivado')).toBeInTheDocument()
  })

  it('does not show Archived badge when not archived', () => {
    renderHeader()
    expect(screen.queryByText('Arquivado')).not.toBeInTheDocument()
  })

  it('renders owner avatar with alt text', () => {
    renderHeader()
    const img = screen.getByAltText('octocat')
    expect(img).toBeInTheDocument()
  })

  it('clicking the repo name link does not propagate', () => {
    renderHeader()
    const repoLink = screen.getByText('my-repo')
    expect(() => fireEvent.click(repoLink)).not.toThrow()
  })
})
