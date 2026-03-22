import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { getToken } from '@features/auth/services/tokenStorage'

const ghClient: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2026-03-10'
  },
  timeout: 10000
})

ghClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export { ghClient }
