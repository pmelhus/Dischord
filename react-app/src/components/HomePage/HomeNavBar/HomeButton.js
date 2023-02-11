import {useHistory, useLocation} from "react-router-dom"


const HomeButton = () => {

  const {pathname} = useLocation()

  const history = useHistory()

  // parse url using split method to get '@me' in url to render the selected class of home button
  const parsedUrlMe = pathname.split('/')[2]



  const handleClick = (e) => {

    e.preventDefault()

    return history.push('/channels/@me')

  }

  return (
    <div className="home-button-div">
      <button className={parsedUrlMe === '@me' ? 'server-image-icon-selected' : "server-image-icon"} onClick={handleClick}>
      <i className="fa-solid fa-house-chimney-heart fa-2xl"></i>
      </button>
    </div>
  );
};

export default HomeButton;
