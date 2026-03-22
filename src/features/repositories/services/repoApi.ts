import { ghClient } from '@shared/services/githubClient'
import type { Repo, SortDirection } from '@features/repositories/types'

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

export { getUserRepos, getRepo }
