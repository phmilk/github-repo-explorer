function Flag({
  active,
  yes,
  no,
}: {
  active: boolean
  yes: string
  no: string
}) {
  return (
    <span className={active ? 'text-success' : 'text-muted'}>
      <i
        className={`bi ${active ? 'bi-check-circle-fill' : 'bi-x-circle'} me-1`}
        aria-hidden="true"
      />
      {active ? yes : no}
    </span>
  )
}

export default Flag
