import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-logo"
        />
      </Link>
      <ul className="mobile-icons-container">
        <Link className="mobile-nav-icon" to="/">
          <li>
            <button type="button" className="icon-button">
              <AiFillHome />
            </button>
          </li>
        </Link>
        <Link className="mobile-nav-icon" to="/">
          <li>
            <button type="button" className="icon-button">
              <BsFillBriefcaseFill />
            </button>
          </li>
        </Link>
        <li>
          <button
            className="mobile-nav-logout-btn"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
      <ul className="laptop-nav-links-container">
        <li>
          <Link to="/" className="laptop-nav-link">
            <p className="laptop-link-text">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="laptop-nav-link">
            <p className="laptop-link-text">Jobs</p>
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="laptop-logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
