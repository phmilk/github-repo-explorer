import { LoginModalContext } from '@features/auth/context/LoginModalContext'
import { useContext } from 'react'

function useLoginModal() {
  const ctx = useContext(LoginModalContext)
  if (!ctx) throw new Error('useLoginModal must be used within LoginModalProvider')
  return ctx
}

export { useLoginModal }
