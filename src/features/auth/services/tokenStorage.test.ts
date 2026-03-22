import { describe, it, expect, beforeEach } from 'vitest'
import {
  getToken,
  setToken,
  clearToken,
  isAuthenticated
} from '@features/auth/services/tokenStorage'

describe('auth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getToken', () => {
    it('returns null when no token is stored', () => {
      expect(getToken()).toBeNull()
    })

    it('returns the stored token', () => {
      localStorage.setItem('gh_token', 'abc123')
      expect(getToken()).toBe('abc123')
    })
  })

  describe('setToken', () => {
    it('stores the token in localStorage', () => {
      setToken('mytoken')
      expect(localStorage.getItem('gh_token')).toBe('mytoken')
    })
  })

  describe('clearToken', () => {
    it('removes the token from localStorage', () => {
      localStorage.setItem('gh_token', 'abc123')
      clearToken()
      expect(localStorage.getItem('gh_token')).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('returns false when no token is stored', () => {
      expect(isAuthenticated()).toBe(false)
    })

    it('returns true when a token is stored', () => {
      setToken('mytoken')
      expect(isAuthenticated()).toBe(true)
    })
  })
})
