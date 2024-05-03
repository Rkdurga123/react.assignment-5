import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import './index.css'

const JobCard = props => {
  const {jobDeatils} = props
  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDeatils

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-items">
        <div className="company-container">
          <div>
            <img src={companyLogoUrl} alt="company logo" className="logo" />
          </div>
          <div>
            <h1 className="title">{title}</h1>
            <div className="star-icon-container">
              <AiFillStar className="star-icon" />
              <p className="rating-count">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-desk">
            <div className="star-icon-container">
              <HiLocationMarker className="location-icon" />
              <p className="location-desc description">{location}</p>
            </div>
            <div className="star-icon-container">
              <HiMail className="location-icon left-icon" />
              <p className="description emp-type">{employmentType}</p>
            </div>
          </div>
          <div className="star-icon-container">
            <p className="package-desc description">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <h1 className="job-description">{jobDescription}</h1>
      </li>
    </Link>
  )
}
export default JobCard
