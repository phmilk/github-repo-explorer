import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

function Search() {
  const navigate = useNavigate()
  const { username: usernameParam } = useParams()
  const [username, setUsername] = useState(usernameParam ?? '')

  return (
    <Form
      role="search"
      className="d-flex flex-grow-1"
      style={{ maxWidth: '480px' }}
      onSubmit={(e) => {
        e.preventDefault()
        if (!username.trim()) {
          navigate('/')
          return
        }
        navigate(`/user/${username.trim()}`)
      }}
    >
      <Form.Label htmlFor="search-username" className="visually-hidden">
        Usuário do GitHub
      </Form.Label>
      <InputGroup className="w-100">
        <Form.Control
          id="search-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="user_name"
          placeholder="Buscar usuário..."
          autoComplete="on"
        />
        <Button type="submit" variant="outline-light" aria-label="Buscar">
          <i className="bi bi-search" aria-hidden="true" />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default Search
