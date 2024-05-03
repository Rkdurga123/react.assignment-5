import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-link-lg">
              Home
            </Link>
            <Link to="/" className="nav-link-sm">
              <AiFillHome className="small-icon" />
            </Link>
          </li>

          <li>
            <Link to="/about" className="nav-link-lg">
              About
            </Link>
            <Link to="/about" className="nav-link-sm">
              <BsBriefcaseFill className="small-icon" />
            </Link>
          </li>
          <li className="sm-logout-list">
            <button className="logout-sm" type="button" onClick={onClickLogout}>
              <FiLogOut className="small-icon" />
              Clear
            </button>
          </li>
        </ul>
        <button type="button" className="logout-lg" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
