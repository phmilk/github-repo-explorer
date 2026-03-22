import Stars from './Stars'
import Forks from './Forks'
import Issues from './Issues'
import Watchers from './Watchers'

function StatBadges() {
  return (
    <div className="d-flex flex-column align-items-end gap-2">
      <Stars />
      <Forks />
      <Issues />
      <Watchers />
    </div>
  )
}

export default StatBadges
