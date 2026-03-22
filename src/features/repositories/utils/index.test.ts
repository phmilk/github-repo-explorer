import { describe, it, expect } from 'vitest'
import {
  formatSize,
  formatDateLong,
  formatDateShort,
  formatCount
} from '@features/repositories/utils'

describe('repositories/utils', () => {
  describe('formatSize', () => {
    it('shows KB when size < 1024', () => {
      expect(formatSize(0)).toBe('0 KB')
      expect(formatSize(512)).toBe('512 KB')
      expect(formatSize(1023)).toBe('1023 KB')
    })

    it('shows MB when size >= 1024', () => {
      expect(formatSize(1024)).toBe('1.0 MB')
      expect(formatSize(2048)).toBe('2.0 MB')
      expect(formatSize(1536)).toBe('1.5 MB')
    })
  })

  describe('formatDateLong', () => {
    it('returns a formatted date string', () => {
      const result = formatDateLong('2024-06-15T00:00:00Z')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('produces different output for different dates', () => {
      const a = formatDateLong('2024-01-01T00:00:00Z')
      const b = formatDateLong('2024-12-01T00:00:00Z')
      expect(a).not.toBe(b)
    })
  })

  describe('formatDateShort', () => {
    it('formats date string to MM/YY format', () => {
      const result = formatDateShort('2024-06-15T00:00:00Z')
      expect(result).toMatch(/\d{2}\/\d{2}/)
    })

    it('handles different dates', () => {
      const jan = formatDateShort('2024-01-01T00:00:00Z')
      const dec = formatDateShort('2024-12-01T00:00:00Z')
      expect(jan).not.toBe(dec)
    })
  })

  describe('formatCount', () => {
    it('returns plain number when count < 1000', () => {
      expect(formatCount(0)).toBe('0')
      expect(formatCount(42)).toBe('42')
      expect(formatCount(999)).toBe('999')
    })

    it('formats count as k when >= 1000', () => {
      expect(formatCount(1000)).toBe('1.0k')
      expect(formatCount(1500)).toBe('1.5k')
      expect(formatCount(10000)).toBe('10.0k')
    })
  })
})
