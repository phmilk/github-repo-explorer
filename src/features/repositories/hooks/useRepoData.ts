import { useEffect, useState } from 'react'
import { getRepo } from '@features/repositories/services/repoApi'
import type { Repo } from '@features/repositories/types'

interface UseRepoDataReturn {
  repo: Repo | null
  loading: boolean
  error: boolean
}

function useRepoData(
  username: string | undefined,
  reponame: string | undefined
): UseRepoDataReturn {
  const [repo, setRepo] = useState<Repo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!username || !reponame) return
    ;(async () => {
      setLoading(true)
      try {
        const response = await getRepo(username, reponame)
        setRepo(response.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setRepo(null)
        setError(true)
      }
      setLoading(false)
    })()
  }, [username, reponame])

  return { repo, loading, error }
}

export { useRepoData }
