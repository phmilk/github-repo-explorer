function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="d-flex flex-column align-items-center justify-content-center gap-3 py-5 text-muted"
    >
      <div className="spinner-border" aria-hidden="true" />
      <span>Carregando...</span>
    </div>
  )
}

export default Loading
