import { useUserCard } from '@hooks/useUserCard'

function Followers() {
  const { followers } = useUserCard()
  return (
    <div className="text-center">
      <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
        <i
          className="bi bi-people text-primary"
          style={{ fontSize: '16px' }}
        ></i>
        <h6 className="mb-0 fw-bold">{followers}</h6>
      </div>
      <small className="text-muted">Seguidores</small>
    </div>
  )
}

export default Followers
