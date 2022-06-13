import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../../../store/session";
import { Modal } from "../../../../context/Modal";
import EditProfileForm from "./EditProfileForm";
import { useState } from "react";

const UserTab = () => {
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
        <Modal onClose={() => setEditModal(false)}>
          <EditProfileForm {...{ setEditModal }} />
        </Modal>
      )}
    </>
  );
};

export default UserTab;
