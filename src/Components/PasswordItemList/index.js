import './index.css'

const PasswordItemList = props => {
  const {eachDetails, onDelteUserList, isCheck} = props
  const {id, webName, userName, password, color} = eachDetails
  const logo = webName.slice(0, 1)
  const onDelete = () => {
    onDelteUserList(id)
  }

  return (
    <li className="list-container">
      <div className={`logo-container ${color}`}>
        <h1 className="logo">{logo}</h1>
      </div>
      <div className="content-flex-container">
        <div className="user-content-container">
          <p className="web-text">{webName}</p>
          <p className="user-name">{userName}</p>
          {isCheck ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-img"
            />
          )}
        </div>
        <button onClick={onDelete} type="button" className="delete-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordItemList
