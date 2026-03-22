import { Route, Routes } from 'react-router'
import { AuthProvider } from '@contexts/AuthContext'
import { LoginModalProvider } from '@contexts/LoginModalContext'
import Layout from '@components/Layout'
import LoginModal from '@components/LoginModal'
import HomePage from '@pages/HomePage'
import UserPage from '@pages/UserPage'
import RepoPage from '@pages/RepoPage'
import NotFoundPage from '@pages/NotFoundPage'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <AuthProvider>
        <LoginModalProvider>
          <LoginModal />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="user/:username" element={<UserPage />} />
              <Route path="repo/:username/:reponame" element={<RepoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </LoginModalProvider>
      </AuthProvider>
    </div>
  )
}

export default App
