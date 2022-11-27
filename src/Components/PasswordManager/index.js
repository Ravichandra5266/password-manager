import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './index.css'
import PasswordItemList from '../PasswordItemList'

const initialBackgroundColor = [
  'orange',
  'green',
  'white',
  'yellow',
  'rose',
  'skyblue',
  'gray',
  'silver',
  'light',
]

class PasswordManager extends Component {
  state = {
    initialSearch: '',
    initialWebName: '',
    initialUserName: '',
    initialPassword: '',
    isCheck: false,
    userPasswordList: [],
  }

  onClickWebName = event => {
    this.setState({initialWebName: event.target.value})
  }

  onClickUserName = event => {
    this.setState({initialUserName: event.target.value})
  }

  onClickPassword = event => {
    this.setState({initialPassword: event.target.value})
  }

  onClickSearch = event => {
    this.setState({initialSearch: event.target.value})
  }

  onClickCheckBox = event => {
    if (event.target.checked) {
      this.setState({isCheck: true})
    } else {
      this.setState({isCheck: false})
    }
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {
      initialWebName,
      initialUserName,
      initialPassword,
      isCheck,
    } = this.state

    const colorBg =
      initialBackgroundColor[
        Math.ceil(Math.random() * initialBackgroundColor.length - 1)
      ]

    const newUserDetails = {
      id: uuidV4(),
      webName: initialWebName,
      userName: initialUserName,
      password: initialPassword,
      color: colorBg,
      checkStatus: isCheck,
    }

    this.setState(prevState => ({
      userPasswordList: [...prevState.userPasswordList, newUserDetails],
      initialWebName: '',
      initialUserName: '',
      initialPassword: '',
    }))
  }

  getCheckedPassword = () => {
    const {isCheck, userPasswordList} = this.state
    if (isCheck === true) {
      return userPasswordList.filter(each => each.checkStatus === true)
    }
    return userPasswordList
  }

  onDelteUserList = id => {
    const {userPasswordList} = this.state
    const filterDataList = userPasswordList.filter(each => each.id !== id)
    this.setState({userPasswordList: filterDataList})
  }

  getSearchResults = checkPassword => {
    const {initialSearch} = this.state
    const searchData = checkPassword.filter(each =>
      each.webName.toLowerCase().includes(initialSearch.toLowerCase()),
    )
    return searchData
  }

  render() {
    const {
      initialWebName,
      initialUserName,
      initialPassword,
      initialSearch,
      isCheck,
    } = this.state
    const checkedPassword = this.getCheckedPassword()
    const noListCount = checkedPassword.length
    const searchResults = this.getSearchResults(checkedPassword)
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="user-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-img"
          />
          <div className="form-card-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="img"
                />
                <input
                  type="text"
                  value={initialWebName}
                  onChange={this.onClickWebName}
                  className="input-ele"
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="img"
                />
                <input
                  type="text"
                  value={initialUserName}
                  onChange={this.onClickUserName}
                  className="input-ele"
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="img"
                />
                <input
                  type="password"
                  value={initialPassword}
                  onChange={this.onClickPassword}
                  className="input-ele"
                  placeholder="Enter Password"
                />
              </div>
              <div className="submit-btn">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="length-search-container">
          <div className="details-info">
            <div className="flex">
              <h1 className="list-length">Your Passwords</h1>
              <p className="list-count">{noListCount}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                value={initialSearch}
                onChange={this.onClickSearch}
                className="search-ele"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              value={isCheck}
              className="check-ele"
              onChange={this.onClickCheckBox}
            />
            <label htmlFor="checkbox">Show passwords</label>
          </div>
          <ul className="each-user-container-details">
            {searchResults.length > 0 ? (
              searchResults.map(eachDetails => (
                <PasswordItemList
                  eachDetails={eachDetails}
                  onDelteUserList={this.onDelteUserList}
                  key={eachDetails.id}
                />
              ))
            ) : (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="nopassword-img"
                />
                <p className="no-passsword-text">No Passwords</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default PasswordManager
