import Bio from './Bio'
import Email from './Email'
import Followers from './Followers'
import Following from './Following'
import Avatar from './Avatar'
import Name from './Name'
import ProfileButton from './ProfileButton'
import UserName from './UserName'

function UserCardSkeleton() {
  return (
    <div
      className="card shadow-sm border-0"
      style={{ maxWidth: '400px', width: '100%' }}
    >
      <div className="card-body text-center p-4 placeholder-glow">
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
  )
}

export default UserCardSkeleton
