import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../../../store/session";
import { Modal } from "../../../../context/Modal";
import PasswordModal from "./PasswordModal";

import { LoadingModal } from "../../../../context/LoadingModal";
import EditForm from "./EditForm";

const EditProfileForm = ({ setEditModal, socket }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="profile-edit-form">
      {loading && (
        <LoadingModal>
          <img
            id="loading-image"
            src="https://c.tenor.com/HJvqN2i4Zs4AAAAi/milk-and-mocha-cute.gif"
          />
        </LoadingModal>
      )}
      <div className="edit-account-container">
        <div className="edit-account-nav">
          <div className="edit-account-nav-items">
            <p>USER SETTINGS</p>
          <nav>

              <div>My Account</div>

          </nav>
          </div>
        </div>

        {/* Actual form content. will render based on nav selection above */}
        <div className="edit-account-forms">
          <EditForm {...{ setEditModal }} {...{ setLoading }} {...{ socket }} />
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
