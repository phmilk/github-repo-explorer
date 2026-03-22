import { Route, Routes } from 'react-router'
import { AuthProvider, LoginModalProvider, LoginModal } from '@features/auth'
import Layout from '@shared/components/Layout'
import HomePage from '@shared/pages/HomePage'
import NotFoundPage from '@shared/pages/NotFoundPage'
import { UserPage } from '@features/users'
import { RepoPage } from '@features/repositories'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
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
  )
}

export default App
