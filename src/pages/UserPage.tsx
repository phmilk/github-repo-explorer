import { useEffect, useState } from 'react'
import { getUserInfo, type UserInfo } from '../api/github'
import { useParams } from 'react-router'
import UserCard from '../components/UserCard'
import UserCardSkeleton from '../components/UserCardSkeleton'

function UserPage() {
  const { username } = useParams()
  const [userInfo, setUserInfo] = useState<UserInfo | null>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    ;(async () => {
      setLoading(true)
      try {
        const response = await getUserInfo(username)
        setUserInfo(response.data)
        setError(false)
      } catch (err) {
        console.error(err)
        setUserInfo(null)
        setError(true)
      }
      setLoading(false)
    })()
  }, [username])

  return (
    <>
      {loading ? (
        <UserCardSkeleton />
      ) : userInfo ? (
        <UserCard user={userInfo} />
      ) : null}
    </>
  )
}

export default UserPage
