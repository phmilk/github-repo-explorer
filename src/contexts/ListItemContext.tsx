import { createContext } from 'react'
import type { RepoInfo } from '@api/github'

interface ListItemContextValue {
  repo: RepoInfo
  username: string
}

const ListItemContext = createContext<ListItemContextValue>(
  {} as ListItemContextValue
)

function ListItemProvider({
  children,
  repo,
  username
}: {
  children: React.ReactNode
  repo: RepoInfo
  username: string
}) {
  return (
    <ListItemContext.Provider value={{ repo, username }}>
      {children}
    </ListItemContext.Provider>
  )
}

export { ListItemProvider, ListItemContext }
