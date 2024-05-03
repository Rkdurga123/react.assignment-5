import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {profileList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.initial})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: profileData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProfileDetails = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList

    return (
      <div className="profile-continer">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="name-heading">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <button
        className="failure-btn"
        type="button"
        data-testid="button"
        onClick={this.getProfileDetails()}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}
export default ProfileDetails
