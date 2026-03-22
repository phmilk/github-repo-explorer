import { createContext } from 'react'
import type { Repo } from '@api/github'

interface ListItemContextValue {
  repo: Repo
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
  repo: Repo
  username: string
}) {
  return (
    <ListItemContext.Provider value={{ repo, username }}>
      {children}
    </ListItemContext.Provider>
  )
}

export { ListItemProvider, ListItemContext }
