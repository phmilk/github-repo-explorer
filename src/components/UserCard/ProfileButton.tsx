interface UserInfo {
  url: string
}

function ProfileButton({ url }: UserInfo) {
  return (
    <div className="mt-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-dark w-100"
      >
        Ver Perfil no GitHub
      </a>
    </div>
  )
}

export default ProfileButton
