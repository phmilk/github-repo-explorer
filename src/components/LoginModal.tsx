import { useEffect, useRef, useState } from 'react'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { auth, githubProvider } from '@lib/firebase'
import { setToken } from '@api/auth'
import { useLoginModal } from '@hooks/useLoginModal'
import Button from 'react-bootstrap/Button'
import type { AxiosError } from 'axios'

function LoginModal() {
  const { isOpen, closeModal } = useLoginModal()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) dialog.showModal()
    else dialog.close()
  }, [isOpen])

  async function handleLogin() {
    setLoading(true)
    setError(null)

    try {
      const result = await signInWithPopup(auth, githubProvider)
      const credential = GithubAuthProvider.credentialFromResult(result)
      if (credential?.accessToken) {
        setToken(credential.accessToken)
      }
      closeModal()
    } catch (err) {
      if (err) {
        if ((err as AxiosError).code !== 'auth/popup-closed-by-user') {
          console.error('Login error:', err)
          setError('Erro ao autenticar com GitHub. Tente novamente.')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="login-title"
      onClose={closeModal}
      style={{ border: 'none', borderRadius: '0.75rem', padding: 0, width: '100%', maxWidth: '360px' }}
    >
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 id="login-title" className="h5 mb-1">
              <i className="bi bi-github me-2" aria-hidden="true" />
              GitHub Repo Explorer
            </h2>
            <p className="text-muted small mb-0">
              Entre com sua conta do GitHub para continuar
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Fechar"
            onClick={closeModal}
          />
        </div>

        {error && (
          <p role="alert" className="text-danger small mb-3">
            <i className="bi bi-exclamation-circle me-1" aria-hidden="true" />
            {error}
          </p>
        )}

        <Button
          variant="dark"
          className="w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              />
              Aguardando autorização...
            </>
          ) : (
            <>
              <i className="bi bi-github me-2" aria-hidden="true" />
              Entrar com GitHub
            </>
          )}
        </Button>
      </div>
    </dialog>
  )
}

export default LoginModal
