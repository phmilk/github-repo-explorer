import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { getUser } from '@features/users/services/userApi'
import { getUserRepos } from '@features/repositories/services/repoApi'
import type { User } from '@features/users/types'
import type { Repo, SortDirection, SortColumn } from '@features/repositories/types'

const VALID_PER_PAGES = [10, 20, 30, 50, 100]
const VALID_SORT_COLUMNS: SortColumn[] = [
  'stargazers_count',
  'forks_count',
  'open_issues_count',
  'full_name'
]

function parsePerPage(value: string | null): number {
  const n = parseInt(value ?? '30', 10)
  return VALID_PER_PAGES.includes(n) ? n : 30
}

function parsePage(value: string | null): number {
  const n = parseInt(value ?? '1', 10)
  return n > 0 ? n : 1
}

function parseSortColumn(value: string | null): SortColumn {
  return VALID_SORT_COLUMNS.includes(value as SortColumn)
    ? (value as SortColumn)
    : 'stargazers_count'
}

function parseSortDirection(value: string | null): SortDirection {
  return value === 'asc' ? 'asc' : 'desc'
}

interface UseReposPaginatedReturn {
  user: User | null | undefined
  repos: Repo[]
  currentPage: number
  perPage: number
  sort: SortColumn
  direction: SortDirection
  totalRepos: number
  totalPages: number
  loading: boolean
  error: boolean
  setCurrentPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setSort: (column: SortColumn, direction: SortDirection) => void
}

function useReposPaginated(
  username: string | undefined
): UseReposPaginatedReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parsePage(searchParams.get('page'))
  const perPage = parsePerPage(searchParams.get('per_page'))
  const sort = parseSortColumn(searchParams.get('sort'))
  const direction = parseSortDirection(searchParams.get('direction'))

  // Only pass sort/direction to the API for full_name (API-side sort)
  const apiSort = sort === 'full_name' ? sort : undefined
  const apiDirection = sort === 'full_name' ? direction : undefined

  const [user, setUser] = useState<User | null>()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!username) return
    ;(async () => {
      try {
        const response = await getUser(username)
        setUser(response.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setUser(null)
        setError(true)
      }
    })()
  }, [username])

  useEffect(() => {
    if (!username) return
    ;(async () => {
      setLoading(true)
      try {
        const reposResponse = await getUserRepos(
          username,
          currentPage,
          perPage,
          apiSort,
          apiDirection
        )
        setRepos(reposResponse.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setRepos([])
        setError(true)
      }
      setLoading(false)
    })()
  }, [username, currentPage, perPage, apiSort, apiDirection])

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

  const setSort = (column: SortColumn, dir: SortDirection) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('sort', column)
        next.set('direction', dir)
        if (column === 'full_name') next.set('page', '1')
        return next
      },
      { replace: true }
    )
  }

  const totalRepos = user?.public_repos ?? 0
  const totalPages = Math.max(1, Math.ceil(totalRepos / perPage))

  return {
    user,
    repos,
    currentPage,
    perPage,
    sort,
    direction,
    totalRepos,
    totalPages,
    loading,
    error,
    setCurrentPage,
    setPerPage,
    setSort
  }
}

export { useReposPaginated }
