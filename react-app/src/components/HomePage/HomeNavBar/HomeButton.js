import {useLocation, useHistory} from "react-router-dom"

const HomeButton = () => {

  const history = useHistory()
  const {pathname} = useLocation()

  const handleClick = (e) => {

    e.preventDefault()

    return history.push('/channels/@me')

  }

  const urlArr = pathname.split('/')


  return (
    <div className="home-button-div">
      <button className={ urlArr[2] === '@me' ?  'server-image-icon-selected':
        "server-image-icon"} onClick={handleClick}>
      <i className="fa-solid fa-house-chimney-heart fa-2xl"></i>
      </button>
    </div>
  );
};

export default HomeButton;
