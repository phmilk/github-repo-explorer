import { useRepoDetails } from '@hooks/useRepoDetails'

function Description() {
  const repo = useRepoDetails()

  return (
    <>
      <h5 className="fw-bold mb-2">Descrição</h5>
      {repo.description ? (
        <p className="fs-5 text-secondary mb-4">{repo.description}</p>
      ) : (
        <p className="fs-5 text-muted fst-italic mb-4">
          Sem descrição disponível.
        </p>
      )}
    </>
  )
}

export default Description
