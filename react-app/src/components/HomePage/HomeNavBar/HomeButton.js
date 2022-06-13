import {useHistory} from "react-router-dom"

import {Modal} from "../../../context/Modal"

const HomeButton = () => {

  const history = useHistory()


  const handleClick = (e) => {

    e.preventDefault()

    return history.push('/channels/@me')

  }

  return (
    <div className="home-button-div">
      <button className="server-image-icon" onClick={handleClick}>
      <i class="fa-solid fa-house-chimney-heart fa-2xl"></i>
      </button>
    </div>
  );
};

export default HomeButton;
