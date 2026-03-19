import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import RepositoryPage from './pages/RepositoryPage'
import NotFoundPage from './pages/NotFoundPage'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="user/:username" element={<UserPage />} />
        <Route
          path="user/:username/repo/:reponame"
          element={<RepositoryPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
