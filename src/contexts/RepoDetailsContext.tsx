import { createContext } from 'react'
import type { RepoInfo } from '@api/github'

const RepoDetailsContext = createContext<RepoInfo>({} as RepoInfo)

function RepoDetailsProvider({
  children,
  repo
}: {
  children: React.ReactNode
  repo: RepoInfo
}) {
  return (
    <RepoDetailsContext.Provider value={{ ...repo }}>
      {children}
    </RepoDetailsContext.Provider>
  )
}

export { RepoDetailsProvider, RepoDetailsContext }
