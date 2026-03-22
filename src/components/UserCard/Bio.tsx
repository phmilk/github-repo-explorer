import { useUserCard } from '@hooks/useUserCard'

function Bio() {
  const { bio } = useUserCard()
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
