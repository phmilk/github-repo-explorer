import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router'
import { getUser } from '@features/users/services/userApi'
import { getUserRepos } from '@features/repositories/services/repoApi'
import { useReposPaginated } from '@features/users/hooks/useReposPaginated'
import type { ReactNode } from 'react'

vi.mock('@features/users/services/userApi', () => ({
  getUser: vi.fn()
}))

vi.mock('@features/repositories/services/repoApi', () => ({
  getUserRepos: vi.fn()
}))

const mockUser = {
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
  bio: null,
  location: null,
  blog: '',
  company: null,
  email: null
}

const mockRepo = {
  id: 1,
  name: 'alpha',
  full_name: 'testuser/alpha',
  html_url: 'https://github.com/testuser/alpha',
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
  stargazers_count: 100,
  forks_count: 10,
  open_issues_count: 2,
  watchers_count: 100,
  subscribers_count: 50,
  network_count: 1,
  size: 200,
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

function wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/user/testuser']}>{children}</MemoryRouter>
  )
}

function wrapperWithParams(params: string) {
  return function WrapperComp({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[`/user/testuser?${params}`]}>
        {children}
      </MemoryRouter>
    )
  }
}

describe('useReposPaginated', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(getUser).mockResolvedValue({ data: mockUser } as never)
    vi.mocked(getUserRepos).mockResolvedValue({ data: [mockRepo] } as never)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in loading state', () => {
    vi.mocked(getUserRepos).mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })
    expect(result.current.loading).toBe(true)
  })

  it('loads user and repos on success', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.repos).toEqual([mockRepo])
    expect(result.current.error).toBe(false)
  })

  it('does nothing when username is undefined', () => {
    const { result } = renderHook(() => useReposPaginated(undefined), {
      wrapper
    })
    expect(result.current.loading).toBe(true)
    expect(result.current.repos).toEqual([])
  })

  it('sets error when both user and repos fetch fail', async () => {
    vi.mocked(getUser).mockRejectedValue(new Error('Not found'))
    vi.mocked(getUserRepos).mockRejectedValue(new Error('Not found'))

    const { result } = renderHook(() => useReposPaginated('nobody'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe(true)
    expect(result.current.user).toBeNull()
  })

  it('sets error when repos fetch fails', async () => {
    vi.mocked(getUserRepos).mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe(true)
    expect(result.current.repos).toEqual([])
  })

  it('computes totalPages based on public_repos and perPage', async () => {
    vi.mocked(getUser).mockResolvedValue({
      data: { ...mockUser, public_repos: 60 }
    } as never)

    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.totalPages).toBe(2)
  })

  it('defaults to page 1 and perPage 30', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.currentPage).toBe(1)
    expect(result.current.perPage).toBe(30)
  })

  it('defaults sort to stargazers_count descending', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.sort).toBe('stargazers_count')
    expect(result.current.direction).toBe('desc')
  })

  it('setCurrentPage updates the page search param', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.setCurrentPage(2)
    })

    expect(result.current.currentPage).toBe(2)
  })

  it('setPerPage updates perPage and resets to page 1', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.setPerPage(50)
    })

    expect(result.current.perPage).toBe(50)
    expect(result.current.currentPage).toBe(1)
  })

  it('setSort updates sort column and direction', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.setSort('forks_count', 'asc')
    })

    expect(result.current.sort).toBe('forks_count')
    expect(result.current.direction).toBe('asc')
  })

  it('falls back to perPage=30 for invalid per_page param', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper: wrapperWithParams('per_page=999')
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.perPage).toBe(30)
  })

  it('falls back to page=1 for invalid page param', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper: wrapperWithParams('page=0')
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.currentPage).toBe(1)
  })

  it('setSort resets to page 1 when sorting by full_name', async () => {
    const { result } = renderHook(() => useReposPaginated('testuser'), {
      wrapper
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.setCurrentPage(3)
    })

    act(() => {
      result.current.setSort('full_name', 'asc')
    })

    expect(result.current.sort).toBe('full_name')
    expect(result.current.currentPage).toBe(1)
  })
})
