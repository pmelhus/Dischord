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
        <h1>HB</h1>
      </button>
    </div>
  );
};

export default HomeButton;
