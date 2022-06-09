import {useHistory} from "react-router-dom"

const HomeButton = () => {

  const history = useHistory()


  const handleClick = (e) => {

    e.preventDefault()

    return history.push('/channels/@me')

  }

  return (
    <>
      <button onClick={handleClick}>
        <h1>HB</h1>
      </button>
    </>
  );
};

export default HomeButton;
