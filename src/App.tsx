import { Route, Routes } from 'react-router'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path=":username" element={<h1>User</h1>} />
      <Route path=":username/:reponame" element={<h1>Repo</h1>} />
    </Routes>
  )
}

export default App
