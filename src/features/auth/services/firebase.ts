import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBePpyEgtREZLmA33-rB8QCW4JDTKB0XQk',
  authDomain: 'my-github-repo-explorer.firebaseapp.com',
  projectId: 'my-github-repo-explorer',
  storageBucket: 'my-github-repo-explorer.firebasestorage.app',
  messagingSenderId: '137081066056',
  appId: '1:137081066056:web:ca7faf89dc273c64fb3e7d',
  measurementId: 'G-V6G2HL2H74'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)
const githubProvider = new GithubAuthProvider()

githubProvider.addScope('read:user')
githubProvider.addScope('public_repo')

export { auth, githubProvider, analytics }
