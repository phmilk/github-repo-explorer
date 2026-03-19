interface BioProps {
  bio: string | null
}

function Bio({ bio }: BioProps) {
  return (
    <p className="card-text small mb-4" style={{ minHeight: '40px' }}>
      {bio ? (
        bio
      ) : (
        <span className="text-muted fst-italic">Sem biografia disponível.</span>
      )}
    </p>
  )
}

export default Bio
