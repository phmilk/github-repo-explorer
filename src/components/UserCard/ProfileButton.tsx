import { useUserCard } from '@hooks/useUserCard'

function ProfileButton() {
  const { html_url } = useUserCard()
  return (
    <a
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary w-100 mt-4 rounded-pill fw-bold"
    >
      Ver Perfil no GitHub
    </a>
  )
}

export default ProfileButton
