import type { RepoInfo as RepoInfoType } from '@api/github'
import { RepoDetailsProvider } from '@contexts/RepoDetailsContext'
import Header from './Header'
import Stats from './Stats/index'
import Description from './Description'
import Footer from './Footer'
import Language from './Language'
import CreatedAt from './CreatedAt'
import UpdatedAt from './UpdatedAt'
import PushedAt from './PushedAt'

interface RepoDetailsProps {
  repo: RepoInfoType
}

function RepoDetails({ repo }: RepoDetailsProps) {
  return (
    <RepoDetailsProvider repo={repo}>
      <div className="card shadow-sm border-0">
        <Header />
        <div className="card-body p-4">
          <Stats />
          <Description />
          <div className="row g-3 mb-4">
            <Language />
            <CreatedAt />
            <UpdatedAt />
            <PushedAt />
          </div>
        </div>
        <Footer />
      </div>
    </RepoDetailsProvider>
  )
}

export default RepoDetails
