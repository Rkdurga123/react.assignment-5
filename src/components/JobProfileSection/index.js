import {component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import JobsFiltersGroup from '../JobsFiltersGroup'
import './index.css'

const employmentTypeList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobProfileSection extends component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, employmentType, searchInput} = this.state
    const url = `https:apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.targetvalue})
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  changeEmploymentType = type => {
    this.setState(
      prevState => ({employmentType: [...prevState.employmentType, type]}),
      this.getJobDetails,
    )
  }

  renderJobDetails = () => {
    const {jobsList, searchInput} = this.state
    const jobDisplay = jobsList.length > 0

    return jobDisplay ? (
      <div className="details-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            placeholder="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
            Search
          </button>
        </div>
        <ul className="job-details-item-container">
          {jobsList.map(eachData => (
            <JobCard key={eachData.key} jobDetails={eachData} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <div className="search-input-container">
          <input
            type="search"
            className="search"
            placeholder="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" /> search
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-desc">
        We cannot seem the page you are looking for{' '}
      </p>
      <button
        type="button"
        data-testid="button"
        className="job-failure-button"
        onClick={this.getJobDetails}
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

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="job-details-container">
        <div className="render-group-items">
          <JobsFiltersGroup
            employmentTypeList={employmentTypeList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            onChangeSearchInput={this.onChangeSearchInput}
            getJobDetails={this.getJobDetails}
          />
        </div>
        <div className="responsive-items">
          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}
export default JobProfileSection
