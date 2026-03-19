interface EmailProps {
  email: string | null
}

function Email({ email }: EmailProps) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 mb-4 text-secondary small">
      <i className="bi bi-envelope" style={{ fontSize: '16px' }}></i>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="text-decoration-none text-secondary"
        >
          {email}
        </a>
      ) : (
        <span>E-mail não público</span>
      )}
    </div>
  )
}

export default Email
