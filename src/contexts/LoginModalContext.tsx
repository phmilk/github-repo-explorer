import { createContext, useState } from 'react'

interface LoginModalContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const LoginModalContext = createContext<LoginModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
})

function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <LoginModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LoginModalContext.Provider>
  )
}

export { LoginModalProvider, LoginModalContext }
