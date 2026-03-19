interface FollowingProps {
  following: number
}

function Following({ following }: FollowingProps) {
  return (
    <div className="text-center">
      <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
        <i
          className="bi bi-person-check text-primary"
          style={{ fontSize: '16px' }}
        ></i>
        <h6 className="mb-0 fw-bold">{following}</h6>
      </div>
      <small className="text-muted">Seguindo</small>
    </div>
  )
}

export default Following
