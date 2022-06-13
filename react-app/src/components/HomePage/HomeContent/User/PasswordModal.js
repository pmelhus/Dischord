import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUserPassword } from "../../../../store/session";

const PasswordModal = ({ user, setPasswordModal, setEditModal }) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState("password");

  const handleEditPassword = async (e) => {
    e.preventDefault();
    const id = user.id;
    const payload = {
      id,
      currentPassword,
      newPassword,
      newPasswordConfirm,
    };

    const editedPassword = await dispatch(editUserPassword(payload));

    if (editedPassword.errors) {
      setErrors(editedPassword.errors);
      console.log(editedPassword.errors)
      return;
    } else {
      setEditModal(false);
    }
  };
  const showHideButton = (e) => {
    e.preventDefault();
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  return (
    <>
      <div>
        <h4>Please enter your current password to set a new password.</h4>
        <label>Current password</label>
        <input
          type="text"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <label>New password</label>
        <input
          type={showPassword}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Confirm new password</label>
        <input
          type={showPassword}
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        ></input>
        {Object.keys(errors).length > 0 && (
          <div className="form-errors">
            {Object.keys(errors).map(
              // (key) => `${errors[key]}`
              (key) => `${errors[key]}`
            )}
          </div>
        )}
        <button onClick={showHideButton}>Show/Hide password</button>
        <button onClick={handleEditPassword}>Save changes</button>
      </div>
    </>
  );
};

export default PasswordModal;
