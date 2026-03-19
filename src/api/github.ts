import axios, { type AxiosInstance } from 'axios'

const ghClient: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2026-03-10'
  },
  timeout: 10000
})

function getUserInfo(username: string) {
  return ghClient.get(`/users/${username}`)
}

export { getUserInfo }
