import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../../../store/session";
import { Modal } from "../../../../context/Modal";
import PasswordModal from "./PasswordModal";
import FadeIn from "react-fade-in";
import { LoadingModal } from "../../../../context/LoadingModal";
import EditForm from "./EditForm";
import { useHistory } from "react-router-dom";
import { logout } from "../../../../store/session";
import LogoutConfirm from "./LogoutConfirm"

const EditProfileForm = ({ editModal, setEditModal, socket }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [logoutConfirm, setLogoutConfirm] = useState(false)

  // state for when a tab is selected in the nav element
  const [selected, setSelected] = useState("my-account")


  const onLogout = async (e) => {
    e.preventDefault();

    await dispatch(logout(user.id));
    await socket.emit("logout", user);

    await history.push("/");
  };

  return (
    <>
      <div className="profile-edit-form">
        {loading && (
          <LoadingModal>
            <img
              id="loading-image"
              src="https://c.tenor.com/HJvqN2i4Zs4AAAAi/milk-and-mocha-cute.gif"
            />
          </LoadingModal>
        )}
        {logoutConfirm && (
<>
<Modal>
  <LogoutConfirm {...{onLogout}} {...{setLogoutConfirm}} />
</Modal>
</>
        )}
        <div className="edit-account-container">
          <div className="edit-account-nav">
            <FadeIn>
              <div className="edit-account-nav-items">
                <p className="user-settings-p">USER SETTINGS</p>
                <nav>
                  <div onClick={() => setSelected('my-account')} className={selected === "my-account" ? ("my-account-div-selected"): ("my-account-div")}>
                    <p className="account-p">My Account</p>
                  </div>
                  <div className='line-divider'></div>
                  <div onClick={() => {setLogoutConfirm(true)}} className="my-account-div">
                    {/* <button onClick={() => setEditModal(false)}>Cancel</button> */}
                    <p className="account-p">Log Out</p>
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </div>
                </nav>
              </div>
            </FadeIn>
          </div>
          {/* Actual form content. will render based on nav selection above */}
          <div className="edit-account-forms">
            <FadeIn>
              <EditForm
              {...{editModal}}
                {...{ setEditModal }}
                {...{ setLoading }}
                {...{ socket }}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileForm;
