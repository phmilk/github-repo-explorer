import { useContext } from 'react'
import { RepoDetailsContext } from '@contexts/RepoDetailsContext'

function useRepoDetails() {
  return useContext(RepoDetailsContext)
}

export { useRepoDetails }
