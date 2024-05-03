import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import SkillsCard from '../SkillsCard'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_t_company.description,
      imageUrl: data.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItem = async () => {
    this.setState({apiStatus: apiStatusConstants.initial})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `hhtps://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSkillData = data.similar_jobs.map(each =>
        this.getFormattedSkillData(each),
      )
      this.setState({
        jobItemList: updatedData,
        similarJobItemList: updatedSkillData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobItemList, similarJobItemList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="full-container">
        <div className="job-container">
          <div className="logo-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <div className="title-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="count-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-container">
            <div className="location-container">
              <div className="responsive">
                <GoLocation className="location-logo" />
                <p className="location-desc">{location}</p>
              </div>
              <div className="responsive">
                <BsBriefcaseFill className="logo-brief" />
                <p className="location-desc">{employmentType}</p>
              </div>
            </div>
            <p className="package-desc">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h1 className="heading">Description</h1>
            <a className="visit-link" href={companyWebsiteUrl}>
              visit
              <BiLinkExternal className="bi-link" />
            </a>
          </div>
          <p className="job-story-desc">{jobDescription}</p>
          <h1 className="heading">Skills</h1>
          <ul className="skill-container">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="heading">Life at company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-logo"
            />
          </div>
        </div>
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similar-cards">
          {similarJobItemList.map(eachItem => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="render-loading-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="heading">Oops! Something went wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-btn"
        data-testid="button"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="get-products-details-container">
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
