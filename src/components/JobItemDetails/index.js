import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {
  BsFillStarFill,
  BsFillBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'Failure',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.loading,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="jobs-failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-img"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="retry-button"
          onClick={this.retryFetching}
        >
          Retry
        </button>
      </div>
    </>
  )

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = modifiedData
      const {skills} = jobDetails
      const modifiedSkills = skills.map(skillDetails => ({
        imageUrl: skillDetails.image_url,
        name: skillDetails.name,
      }))
      const modifiedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: modifiedSkills,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        lifeAtCompany: jobDetails.life_at_company,
        title: jobDetails.title,
      }
      const modifiedSimilarJobs = similarJobs.map(details => ({
        companyLogoUrl: details.company_logo_url,
        employmentType: details.employment_type,
        id: details.id,
        jobDescription: details.job_description,
        location: details.location,
        rating: details.rating,
        title: details.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: modifiedJobDetails,
        similarJobs: modifiedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryFetching = () => {
    this.getJobDetails()
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      location,
      title,
      rating,
      skills,
      jobDescription,
      lifeAtCompany,
    } = jobDetails

    const modifiedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    const {description, imageUrl} = modifiedLifeAtCompany

    return (
      <>
        <Header />
        <div className="job-details-page">
          <div className="job-details-card">
            <div className="logo-title-container">
              <div className="logo-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="logo-image"
                />
              </div>
              <div className="title-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <BsFillStarFill className="star-icon" />
                  <p className="job-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="loc-salary-container">
              <div className="location-employment-container">
                <div className="icon-container">
                  <GoLocation className="job-card-icon" />
                  <p>{location}</p>
                </div>
                <div className="icon-container">
                  <BsFillBriefcaseFill className="job-card-icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="job-salary">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="description-company-link">
              <h1 className="description-heading">Description</h1>
              <div className="company-visit-link">
                <a href={companyWebsiteUrl} className="visit-link">
                  Visit
                </a>
                <BsBoxArrowUpRight />
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(skillDetails => (
                <li className="skill-card" key={skillDetails.name}>
                  <img
                    src={skillDetails.imageUrl}
                    alt={skillDetails.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{skillDetails.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-at-company-card">
              <p className="company-description">{description}</p>
              <img
                alt="life at company"
                src={imageUrl}
                className="company-image"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(similarJobDetails => (
              <li key={similarJobDetails.id}>
                <SimilarJobCard jobDetails={similarJobDetails} />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default JobItemDetails
