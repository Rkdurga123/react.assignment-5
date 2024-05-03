import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => this.setstate({showSubmitError: true, errorMsg})

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setstate({username: event.target.value})
  }

  onChangePassword = event => {
    this.setstate({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="input"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="input-container">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="input"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      ;<Redirect to="/" />
    }

    return (
      <div className="jobby-app-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.renderUsername()}
            {this.renderPassword()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
