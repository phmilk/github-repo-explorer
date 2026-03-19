import { useNavigate, useParams } from 'react-router'

function Search() {
  const navigate = useNavigate()
  const params = useParams()

  return (
    <form
      className="w-100 pt-3"
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userName = formData.get('user_name')
        if (!userName) {
          navigate(`/`)
          return
        }
        navigate(`/user/${userName}`)
      }}
    >
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search" />
        </span>
        <input
          defaultValue={params.username}
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
