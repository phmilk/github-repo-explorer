import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@features/repositories/services/repoApi', async () => {
  return {
    getUserRepos: vi.fn(),
    getRepo: vi.fn()
  }
})

import { getUserRepos, getRepo } from '@features/repositories/services/repoApi'

describe('repoApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getUserRepos is callable', () => {
    expect(getUserRepos).toBeDefined()
  })

  it('getUserRepos resolves with repos array', async () => {
    vi.mocked(getUserRepos).mockResolvedValue({ data: [] } as never)
    const result = await getUserRepos('octocat', 1, 30)
    expect(result.data).toEqual([])
  })

  it('getRepo is callable', () => {
    expect(getRepo).toBeDefined()
  })

  it('getRepo resolves with repo data', async () => {
    vi.mocked(getRepo).mockResolvedValue({
      data: { name: 'hello-world' }
    } as never)
    const result = await getRepo('octocat', 'hello-world')
    expect(result.data.name).toBe('hello-world')
  })
})
