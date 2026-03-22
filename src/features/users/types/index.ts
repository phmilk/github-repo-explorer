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
