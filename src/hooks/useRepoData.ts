import { useEffect, useState } from 'react'
import { getRepo, isRateLimitError, type Repo } from '@api/github'

interface UseRepoDataReturn {
  repo: Repo | null
  loading: boolean
  error: boolean
  rateLimited: boolean
}

function useRepoData(
  username: string | undefined,
  reponame: string | undefined
): UseRepoDataReturn {
  const [repo, setRepo] = useState<Repo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  useEffect(() => {
    if (!username || !reponame) return
    ;(async () => {
      setLoading(true)
      setRateLimited(false)
      try {
        const response = await getRepo(username, reponame)
        setRepo(response.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setRepo(null)
        if (isRateLimitError(err)) {
          setRateLimited(true)
        } else {
          setError(true)
        }
      }
      setLoading(false)
    })()
  }, [username, reponame])

  return { repo, loading, error, rateLimited }
}

export { useRepoData }
