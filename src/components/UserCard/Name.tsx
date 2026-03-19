interface NameProps {
  name: string | null
  login: string
}

function Name({ name, login }: NameProps) {
  return <h5 className="card-title fw-bold mb-1">{name || login}</h5>
}

export default Name
