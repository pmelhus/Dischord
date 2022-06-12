import { useSelector } from "react-redux";

const UserTab = () => {
  const user = useSelector((state) => state.session.user);
  return (<>

    <div className="usertab-container">
      <div className='usertab-image-username'>
        <img alt="profile" src={user.image_url}></img>
        <h4>{user.username}</h4>
      </div>
      <button id='usertab-gear-icon'>
        <i className="fa-solid fa-gear"></i>
      </button>
    </div>
  </>
  );
};

export default UserTab;
