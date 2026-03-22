function InfoRow({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="d-flex gap-3 mb-1 overflow-hidden">
      <span className="text-muted text-nowrap flex-shrink-0">{label}</span>
      <span className="overflow-hidden">{children}</span>
    </div>
  )
}

export default InfoRow
