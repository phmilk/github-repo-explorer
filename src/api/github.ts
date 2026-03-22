import axios, { type AxiosInstance } from 'axios'
import { getToken } from './auth'

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

export interface RepoInfo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  watchers_count: number
}

export type SortOption = 'created' | 'updated' | 'pushed' | 'full_name'
export type SortDirection = 'asc' | 'desc'

function getAuthenticatedUser() {
  return ghClient.get<UserInfo>('/user')
}

function getUserInfo(username: string) {
  return ghClient.get<UserInfo>(`/users/${username}`)
}

function getUserReposPage(
  username: string,
  page: number,
  sort: SortOption = 'updated',
  direction: SortDirection = 'desc',
  perPage: number = 30
) {
  return ghClient.get<RepoInfo[]>(
    `/users/${username}/repos?per_page=${perPage}&page=${page}&sort=${sort}&direction=${direction}`
  )
}

function getRepoInfo(username: string, reponame: string) {
  return ghClient.get<RepoInfo>(`/repos/${username}/${reponame}`)
}

export function isRateLimitError(err: unknown): boolean {
  if (axios.isAxiosError(err) && err.response?.status === 403) {
    const message: string = err.response.data?.message ?? ''
    return message.toLowerCase().includes('rate limit')
  }
  return false
}

export { getAuthenticatedUser, getUserInfo, getUserReposPage, getRepoInfo }
