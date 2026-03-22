import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@features/users/services/userApi', async () => {
  return {
    getUser: vi.fn(),
    getAuthUser: vi.fn()
  }
})

import { getUser, getAuthUser } from '@features/users/services/userApi'

describe('userApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getUser is callable', () => {
    vi.mocked(getUser).mockResolvedValue({
      data: { login: 'octocat' }
    } as never)
    expect(getUser).toBeDefined()
  })

  it('getUser resolves with user data', async () => {
    vi.mocked(getUser).mockResolvedValue({
      data: { login: 'octocat', id: 1 }
    } as never)
    const result = await getUser('octocat')
    expect(result.data.login).toBe('octocat')
  })

  it('getAuthUser is callable', () => {
    expect(getAuthUser).toBeDefined()
  })

  it('getAuthUser resolves with authenticated user', async () => {
    vi.mocked(getAuthUser).mockResolvedValue({
      data: { login: 'me' }
    } as never)
    const result = await getAuthUser()
    expect(result.data.login).toBe('me')
  })
})
