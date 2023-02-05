import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../../../store/session";
import { ProfileModal } from "../../../../context/ProfileModal";
import EditProfileForm from "./EditProfileForm";
import { useState } from "react";
import "./EditProfileForm.css"

const UserTab = ({socket}) => {
  const user = useSelector((state) => state.session.user);
  const [editModal, setEditModal] = useState(false);

  const handleEditModal = () => {
    setEditModal(true);
  };

  return (
    <>
      <div className="usertab-container">
        <div className="usertab-image-username">
          {user.image_url ? (
            <img alt="profile" src={user.image_url}></img>
          ) : (
            <>
              <div className='usertab-default-profile-image'>
                <i className="fa-solid fa-user-music"></i>
              </div>
            </>
          )}
          <h4>{user.username}</h4>
        </div>
        <button onClick={handleEditModal} id="usertab-gear-icon">
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>
      {editModal && (
        <ProfileModal className="edit-profile-modal" onClose={() => setEditModal(false)}>
          <EditProfileForm {...{socket}} {...{ setEditModal }} />
        </ProfileModal>
      )}
    </>
  );
};

export default UserTab;
