import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

function Search() {
  const navigate = useNavigate()
  const { username: usernameParam } = useParams()
  const [username, setUsername] = useState(usernameParam ?? '')

  return (
    <form
      className="w-100"
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        if (!username.trim()) {
          navigate('/')
          return
        }
        navigate(`/user/${username.trim()}`)
      }}
    >
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search" />
        </span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="user_name"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
        />
      </div>
    </form>
  )
}

export default Search
