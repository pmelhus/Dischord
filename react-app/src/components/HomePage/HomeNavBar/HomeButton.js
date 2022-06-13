import {useHistory} from "react-router-dom"

const HomeButton = () => {

  const history = useHistory()


  const handleClick = (e) => {

    e.preventDefault()

    return history.push('/channels/@me')

  }

  return (
    <div className="home-button-div">
      <button className="server-image-icon" onClick={handleClick}>
      <i className="fa-solid fa-house-chimney-heart fa-2xl"></i>
      </button>
    </div>
  );
};

export default HomeButton;
