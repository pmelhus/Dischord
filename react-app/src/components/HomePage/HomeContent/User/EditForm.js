
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../../../store/session";
import LogoutButton from "./LogoutButton";

const EditForm = ({setEditModal, socket, setLoading}) => {

  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(user?.image_url);

  const [errors, setErrors] = useState({});
  const [passwordModal, setPasswordModal] = useState(false);
  const dispatch = useDispatch();

  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const id = user.id;
    const payload = {
      id,
      username,
      email,
      bio,
      image,
    };
    await setLoading(true);
    const editedUser = await dispatch(editUserProfile(payload));
    if (editedUser.errors) {
      await setLoading(false);
      setErrors(editedUser.errors);
      return;
    } else {
      await setEditModal(false);
      await setLoading(false);
    }
  };

  const handlePasswordModal = (e) => {
    e.preventDefault();
    // setEditModal(false)
    setPasswordModal(!passwordModal);
  };

  useEffect(() => {
    if (!user.image_url && !image) {
      setPreview(undefined);
      return;
    }

    if (user.image_url && !image) {
      setPreview(user.image_url);
    }

    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    // free memory when ever this component is unmounted
  }, [image, user]);

  return (
    <form className='edit-account-form'>
    <div className="login-email">
      <label>Username</label>
      {errors && errors.username && (
        <div className="error-msg">
          <p>*{errors.username}*</p>
        </div>
      )}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
    </div>
    <div className="login-email">
      <label>Email</label>
      {errors && errors.email && (
        <div className="error-msg">
          <p>*{errors.email}*</p>
        </div>
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
    </div>
    <div className="login-email">
      {errors && errors.bio && (
        <div className="error-msg">
          <p>*{errors.bio}*</p>
        </div>
      )}
      <label>Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
    </div>
    {preview ? (
      <div id="user-picture-preview">
        <img alt="current profile" src={preview} />
      </div>
    ) : (
      <div className="user-image-preview">
        {user?.image_url ? (
          <img
            alt="profile preview"
            className="server-image-icon-edit"
            src={user?.image_url}
          />
        ) : (
          <h2 className="server-image-icon-edit">
            {user?.username.split("")[0]}
          </h2>
        )}
      </div>
    )}
    <div className="edit-profile-image-preview">
      <label className="custom-file-upload">
        {errors && errors.image_file && (
          <div className="error-msg">
            <p>*{errors.image_file}*</p>
          </div>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg, image/png, image/gif"
          onChange={updateImage}
        ></input>
        Upload your profile pic!
      </label>
    </div>
    {/* {Object.keys(errors).length > 0 && (
      <div className="form-errors">
        {Object.keys(errors).map(
          // (key) => `${errors[key]}`
          (key) => `${errors[key]}`
        )}
      </div>
    )} */}
    <div className="button-div-user">
      <div>
        <button onClick={handleEditProfile}>Save</button>
        <button onClick={handlePasswordModal}>Change password</button>
      </div>
      <div>
        <button onClick={() => setEditModal(false)}>Cancel</button>
        <LogoutButton {...{ socket }} />
      </div>
    </div>
  </form>
  )
}

export default EditForm
