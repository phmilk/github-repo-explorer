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

export type SortColumn =
  | 'stargazers_count'
  | 'forks_count'
  | 'open_issues_count'
  | 'full_name'
