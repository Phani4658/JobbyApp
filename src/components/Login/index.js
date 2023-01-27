import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', isLoginFailure: false, errorMsg: ''}

  onChangeUsernameField = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="form-field">
        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <br />
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={this.onChangeUsernameField}
        />
      </div>
    )
  }

  onChangePasswordField = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="form-field">
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <br />
        <input
          id="password"
          placeholder="Password"
          type="password"
          className="login-input"
          value={password}
          onChange={this.onChangePasswordField}
        />
      </div>
    )
  }

  onSubmitSuccess = data => {
    const {jwtToken} = data
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({username: '', password: ''})
    history.replace('/')
  }

  onSubmitFailure = data => {
    const {errorMsg} = data
    this.setState({errorMsg, isLoginFailure: true})
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const modifiedData = {jwtToken: data.jwt_token}
      this.onSubmitSuccess(modifiedData)
    } else {
      const modifiedData = {errorMsg: data.error_msg}
      this.onSubmitFailure(modifiedData)
    }
  }

  render() {
    const {errorMsg, isLoginFailure} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="login-page-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <form className="login-form" onSubmit={this.submitLoginDetails}>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-button">
              Login
            </button>
            {isLoginFailure && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
