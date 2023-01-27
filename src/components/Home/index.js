import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const navigateToJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-text-container">
        <h1 className="home-heading">Find the Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information ,
          company reviews. Find the job that fits your abilities and potentials
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
