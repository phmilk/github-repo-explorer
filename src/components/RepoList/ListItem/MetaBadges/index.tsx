import Language from './Language'
import CreatedAt from './CreatedAt'
import UpdatedAt from './UpdatedAt'
import PushedAt from './PushedAt'
import Size from './Size'

function MetaBadges() {
  return (
    <div className="d-flex gap-2 flex-wrap mt-1">
      <Language />
      <CreatedAt />
      <UpdatedAt />
      <PushedAt />
      <Size />
    </div>
  )
}

export default MetaBadges
