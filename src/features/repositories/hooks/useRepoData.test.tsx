import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getRepo } from '@features/repositories/services/repoApi'
import { useRepoData } from '@features/repositories/hooks/useRepoData'

vi.mock('@features/repositories/services/repoApi', () => ({
  getRepo: vi.fn()
}))

const mockRepo = {
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
  language: 'TypeScript',
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
  }
}

describe('useRepoData', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stays loading when username is undefined', () => {
    const { result } = renderHook(() => useRepoData(undefined, undefined))
    expect(result.current.loading).toBe(true)
    expect(result.current.repo).toBeNull()
    expect(result.current.error).toBe(false)
  })

  it('stays loading when reponame is undefined', () => {
    const { result } = renderHook(() => useRepoData('user', undefined))
    expect(result.current.loading).toBe(true)
  })

  it('fetches and returns repo on success', async () => {
    vi.mocked(getRepo).mockResolvedValue({ data: mockRepo } as never)

    const { result } = renderHook(() => useRepoData('user', 'test-repo'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.repo).toEqual(mockRepo)
    expect(result.current.error).toBe(false)
  })

  it('sets error on fetch failure', async () => {
    vi.mocked(getRepo).mockRejectedValue(new Error('Not found'))

    const { result } = renderHook(() => useRepoData('user', 'missing'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.repo).toBeNull()
    expect(result.current.error).toBe(true)
  })

  it('calls getRepo with correct arguments', async () => {
    vi.mocked(getRepo).mockResolvedValue({ data: mockRepo } as never)

    renderHook(() => useRepoData('octocat', 'hello-world'))

    await waitFor(() =>
      expect(vi.mocked(getRepo)).toHaveBeenCalledWith('octocat', 'hello-world')
    )
  })
})
