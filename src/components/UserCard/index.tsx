import type { UserInfo } from '../../api/github'
import Bio from './Bio'
import Email from './Email'
import Followers from './Followers'
import Following from './Following'
import Avatar from './Avatar'
import Name from './Name'
import ProfileButton from './ProfileButton'
import UserName from './UserName'

export interface UserCardProps {
  user: UserInfo
}

function UserCard({ user }: UserCardProps) {
  return (
    <div
      className="card shadow-sm border-0"
      style={{ maxWidth: '400px', width: '100%' }}
    >
      <div className="card-body text-center p-4">
        <Avatar avatar_url={user.avatar_url} login={user.login} />
        <Name name={user.name} login={user.login} />
        <UserName login={user.login} />
        <Bio bio={user.bio} />
        <Email email={user.email} />
        <div className="d-flex justify-content-around border-top pt-3 mt-3">
          <Followers followers={user.followers} />
          <Following following={user.following} />
        </div>
        <ProfileButton url={user.html_url} />
      </div>
    </div>
  )
}

export default UserCard
