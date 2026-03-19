import axios, { type AxiosInstance } from 'axios'

const ghClient: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2026-03-10'
  },
  timeout: 10000
})

export interface UserInfo {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  name: string | null
  bio: string | null
  location: string | null
  blog: string
  company: string | null
  email: string | null
}

function getUserInfo(username: string) {
  return ghClient.get<UserInfo>(`/users/${username}`)
}

export { getUserInfo }
