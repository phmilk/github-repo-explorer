interface ImageProps {
  avatar_url: string
  login: string
}

function Avatar({ avatar_url, login }: ImageProps) {
  return (
    <div className="position-relative d-inline-block mb-3">
      <img
        src={avatar_url}
        alt={`Avatar de ${login}`}
        width={120}
        height={120}
        className="rounded-circle border border-4 border-light shadow-sm"
        referrerPolicy="no-referrer"
      />
    </div>
  )
}

export default Avatar
