import { LoginModalContext } from '@contexts/LoginModalContext'
import { useContext } from 'react'

function useLoginModal() {
  return useContext(LoginModalContext)
}

export { useLoginModal }
