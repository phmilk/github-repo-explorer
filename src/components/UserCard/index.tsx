import type { UserInfo } from '@api/github'
import { UserCardProvider } from '@contexts/UserCardContext'
import Avatar from './Avatar'
import Name from './Name'
import UserName from './UserName'
import Bio from './Bio'
import Email from './Email'
import Followers from './Followers'
import Following from './Following'
import ProfileButton from './ProfileButton'

interface UserCardProps {
  user: UserInfo
}

function UserCard({ user }: UserCardProps) {
  return (
    <UserCardProvider user={user}>
      <div className="card border-0 h-100 d-flex flex-column">
        <div className="card-body d-flex flex-column gap-3 text-center p-4 align-items-center">
          <Avatar />
          <Name />
          <UserName />
          <Bio />
          <Email />
          <div className="d-flex justify-content-around border-top pt-3 mt-3">
            <Followers />
            <Following />
          </div>
          <ProfileButton />
        </div>
      </div>
    </UserCardProvider>
  )
}

export default UserCard
