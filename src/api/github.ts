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

export interface User {
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

export interface Repo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  fork: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  default_branch: string
  topics: string[]
  language: string | null
  license: { key: string; name: string; spdx_id: string } | null
  has_issues: boolean
  has_discussions: boolean
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  subscribers_count: number
  network_count: number
  size: number
  created_at: string
  updated_at: string
  pushed_at: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
    type: string
  }
}

export type SortDirection = 'asc' | 'desc'

function getAuthUser() {
  return ghClient.get<User>('/user')
}

function getUser(username: string) {
  return ghClient.get<User>(`/users/${username}`)
}

function getUserRepos(
  username: string,
  page: number,
  perPage: number = 30,
  sort?: string,
  direction?: SortDirection
) {
  const params = new URLSearchParams({
    per_page: perPage.toString(),
    page: page.toString()
  })
  if (sort) params.set('sort', sort)
  if (direction) params.set('direction', direction)
  return ghClient.get<Repo[]>(`/users/${username}/repos?${params}`)
}

function getRepo(username: string, reponame: string) {
  return ghClient.get<Repo>(`/repos/${username}/${reponame}`)
}

export function getRateLimitMessage(err: unknown): string | null {
  if (axios.isAxiosError(err) && err.response?.status === 403) {
    const message: string = err.response.data?.message ?? ''
    if (message.toLowerCase().includes('rate limit')) return message
  }
  return null
}

export function isRateLimitError(err: unknown): boolean {
  return getRateLimitMessage(err) !== null
}

export { getAuthUser, getUser, getUserRepos, getRepo }
