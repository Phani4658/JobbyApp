import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-card">
        <div className="logo-title-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default SimilarJobCard
