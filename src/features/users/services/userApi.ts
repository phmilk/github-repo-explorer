import { ghClient } from '@shared/services/githubClient'
import type { User } from '@features/users/types'

function getAuthUser() {
  return ghClient.get<User>('/user')
}

function getUser(username: string) {
  return ghClient.get<User>(`/users/${username}`)
}

export { getAuthUser, getUser }
