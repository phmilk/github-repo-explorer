import { useContext } from 'react'
import { UserCardContext } from '@contexts/UserCardContext'

function useUserCard() {
  return useContext(UserCardContext)
}

export { useUserCard }
