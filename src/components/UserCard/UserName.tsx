interface NameProps {
  login: string
}

function UserName({ login }: NameProps) {
  return <h6 className="card-subtitle text-secondary mb-3">@{login}</h6>
}

export default UserName
