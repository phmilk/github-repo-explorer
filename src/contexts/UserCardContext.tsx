import { createContext } from 'react'
import type { UserInfo } from '@api/github'

const UserCardContext = createContext<UserInfo>({} as UserInfo)

function UserCardProvider({
  children,
  user
}: {
  children: React.ReactNode
  user: UserInfo
}) {
  return (
    <UserCardContext.Provider value={{ ...user }}>
      {children}
    </UserCardContext.Provider>
  )
}

export { UserCardProvider, UserCardContext }
