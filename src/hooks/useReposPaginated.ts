import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  getUserInfo,
  getUserReposPage,
  isRateLimitError,
  type UserInfo,
  type RepoInfo,
  type SortOption,
  type SortDirection
} from '@api/github'

const VALID_SORTS: SortOption[] = ['created', 'updated', 'pushed', 'full_name']
const VALID_PER_PAGES = [10, 20, 30, 50, 100]

function parseSort(value: string | null): SortOption {
  return VALID_SORTS.includes(value as SortOption)
    ? (value as SortOption)
    : 'full_name'
}

function parseDirection(value: string | null): SortDirection {
  return value === 'asc' ? 'asc' : 'desc'
}

function parsePerPage(value: string | null): number {
  const n = parseInt(value ?? '30', 10)
  return VALID_PER_PAGES.includes(n) ? n : 30
}

function parsePage(value: string | null): number {
  const n = parseInt(value ?? '1', 10)
  return n > 0 ? n : 1
}

interface UseReposPaginatedReturn {
  userInfo: UserInfo | null | undefined
  repos: RepoInfo[]
  currentPage: number
  perPage: number
  sortOption: SortOption
  sortDirection: SortDirection
  totalRepos: number
  totalPages: number
  loading: boolean
  error: boolean
  rateLimited: boolean
  setCurrentPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setSort: (option: SortOption, direction: SortDirection) => void
}

function useReposPaginated(
  username: string | undefined
): UseReposPaginatedReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parsePage(searchParams.get('page'))
  const perPage = parsePerPage(searchParams.get('per_page'))
  const sortOption = parseSort(searchParams.get('sort'))
  const sortDirection = parseDirection(searchParams.get('direction'))

  const [userInfo, setUserInfo] = useState<UserInfo | null>()
  const [repos, setRepos] = useState<RepoInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  useEffect(() => {
    if (!username) return
    ;(async () => {
      try {
        const userResponse = await getUserInfo(username)
        setUserInfo(userResponse.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setUserInfo(null)
        if (isRateLimitError(err)) setRateLimited(true)
        else setError(true)
      }
    })()
  }, [username])

  useEffect(() => {
    if (!username) return
    ;(async () => {
      setLoading(true)
      setRateLimited(false)
      try {
        const reposResponse = await getUserReposPage(
          username,
          currentPage,
          sortOption,
          sortDirection,
          perPage
        )
        setRepos(reposResponse.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setRepos([])
        if (isRateLimitError(err)) setRateLimited(true)
        else setError(true)
      }
      setLoading(false)
    })()
  }, [username, currentPage, sortOption, sortDirection, perPage])

  const setCurrentPage = (page: number) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', page.toString())
        return next
      },
      { replace: true }
    )
  }

  const setPerPage = (newPerPage: number) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('per_page', newPerPage.toString())
        next.set('page', '1')
        return next
      },
      { replace: true }
    )
  }

  const setSort = (option: SortOption, direction: SortDirection) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('sort', option)
        next.set('direction', direction)
        next.set('page', '1')
        return next
      },
      { replace: true }
    )
  }

  const totalRepos = userInfo?.public_repos ?? 0
  const totalPages = Math.max(1, Math.ceil(totalRepos / perPage))

  return {
    userInfo,
    repos,
    currentPage,
    perPage,
    sortOption,
    sortDirection,
    totalRepos,
    totalPages,
    loading,
    error,
    rateLimited,
    setCurrentPage,
    setPerPage,
    setSort
  }
}

export { useReposPaginated }
