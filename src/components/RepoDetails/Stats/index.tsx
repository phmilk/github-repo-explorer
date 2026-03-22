import Stars from './Stars'
import Forks from './Forks'
import Issues from './Issues'
import Watchers from './Watchers'
import Size from './Size'

function Stats() {
  return (
    <div className="d-flex gap-3 mb-4 flex-wrap">
      <Stars />
      <Forks />
      <Issues />
      <Watchers />
      <Size />
    </div>
  )
}

export default Stats
