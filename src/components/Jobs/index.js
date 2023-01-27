import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileCard from '../ProfileCard'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'Failure',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.loading,
    searchInput: '',
    selectedSalaryRange: '',
    employmentType: [],
    jobsList: [],
  }

  componentDidMount() {
    this.getAllJobsList()
  }

  getAllJobsList = async () => {
    const {searchInput, selectedSalaryRange, employmentType} = this.state
    const employmentTypeString = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const modifiedJobs = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: modifiedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryFetching = () => {
    this.getAllJobsList()
  }

  updateEmploymentFilter = value => {
    const {employmentType} = this.state
    const modifiedEmploymentType = [...employmentType, value]
    this.setState({employmentType: modifiedEmploymentType}, this.getAllJobsList)
  }

  updateSalaryRange = value => {
    this.setState({selectedSalaryRange: value}, this.getAllJobsList)
  }

  onEnterSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    this.getAllJobsList()
  }

  renderAllJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="jobs-list-container">
          {jobsList.map(jobDetails => (
            <JobCard jobDetails={jobDetails} key={jobDetails.id} />
          ))}
        </ul>
      )
    }
    return this.renderNoJobsView()
  }

  renderFailureView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryFetching}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsPage = () => (
    <>
      <Header />
      <div className="jobs-page">
        <div className="search-bar-container desktop-search-view">
          <input
            type="search"
            className="search-bar"
            placeholder="search"
            onKeyDown={this.onEnterSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onClickSearchInput}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="jobs-bottom-part">
          <div className="profile-filters-container">
            <ProfileCard />
            <hr />
            <FiltersGroup
              updateEmploymentFilter={this.updateEmploymentFilter}
              updateSalaryRange={this.updateSalaryRange}
            />
          </div>
          <div className="all-jobs-container">
            <div className="search-bar-container mobile-search-view">
              <input
                type="search"
                className="search-bar"
                placeholder="search"
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobsView()}
          </div>
        </div>
      </div>
    </>
  )

  render() {
    return this.renderJobsPage()
  }
}

export default Jobs
