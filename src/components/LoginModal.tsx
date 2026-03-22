import { useState } from 'react'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { auth, githubProvider } from '@lib/firebase'
import { setToken } from '@api/auth'
import { useLoginModal } from '@hooks/useLoginModal'
import type { AxiosError } from 'axios'

function LoginModal() {
  const { isOpen, closeModal } = useLoginModal()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Body className="p-4 text-center">
        <i className="bi bi-github" style={{ fontSize: '56px' }}></i>
        <h5 className="mt-3 mb-1">GitHub Repo Explorer</h5>
        <p className="text-muted small mb-4">
          Entre com sua conta do GitHub para continuar
        </p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <Button
          variant="dark"
          className="w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" />
              Aguardando autorização...
            </>
          ) : (
            <>
              <i className="bi bi-github"></i>
              Entrar com GitHub
            </>
          )}
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
