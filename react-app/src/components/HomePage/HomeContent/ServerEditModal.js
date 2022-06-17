import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { editServer, deleteServer } from "../../../store/server";
import { Modal } from "../../../context/Modal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ServerEditModal = ({ setShowEditModal }) => {
  const { pathname } = useLocation();
  const servers = useSelector((state) => Object.values(state.servers));
  const currServer = servers?.find(
    (server) => server.id === parseInt(pathname.split("/")[2])
  );
  const sessionUserId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const [privacy, setPrivacy] = useState(currServer?.public);
  const [image, setImage] = useState(null);
  const privacyBoolean = currServer?.name === "true";
  const [name, setName] = useState(currServer?.name);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [changed, setChanged] = useState(false);
  const [imageError, setImageError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [preview, setPreview] = useState(currServer?.image_url);

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "true") {
      setPrivacy(true);
    }
    if (e.target.value === "false") {
      setPrivacy(false);
    }
    setChanged(true);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner_id = currServer?.owner_id;
    const id = currServer?.id;
    if (!changed) {
      setPrivacy(currServer?.public);
    }

    const payload = { id, name, privacy, image, owner_id };

    const editedServer = await dispatch(editServer(payload));

    if (editedServer.errors) {
      // console.log(newEstate.errors)
      setErrors(editedServer.errors);
      return;
    } else {
      setName("");
      setImage(null);
      setShowEditModal(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  useEffect(() => {
    setNameError(true);
    if (name.length > 1 && name.length < 33) {
      setNameError(false);
    }

    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [name, image]);

  return (
    <form className="server-edit-form-real">
      <div className="server-edit-form-msg">
        <h2>Server Overview</h2>
      </div>
      <div className="server-edit-image">
        {preview ? (
          <>
            <div id="user-picture-preview">
              <img alt="current profile" src={preview} />
            </div>
          </>
        ) : (
          <>
            {currServer?.image_url ? (
              <img
                alt="profile preview"
                className="server-image-icon-edit"
                src={currServer?.image_url}
              />
            ) : (
              <h2 className="server-image-icon-edit">
                {currServer?.name.split("")[0]}
              </h2>
            )}
          </>
        )}
        <div className="upload-image-server">
          <label id="profile-pic-label" className="custom-file-upload">
            Upload image
            <input type="file" accept="image/*" onChange={updateImage}></input>
          </label>
        </div>
        {imageError && errors && errors.image_url && (
          <div className="error-msg">
            <p>*{errors?.image_url}*</p>
          </div>
        )}
      </div>
      <div className="channel-input">
        <label>Server name</label>
        {nameError && errors && errors.name && (
          <div className="error-msg">
            <p>*{errors.name}*</p>
          </div>
        )}
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div className="private-input">
        {currServer?.public ? (
          <>
            <p>Server is currently:</p>
            <h4>Public</h4>
          </>
        ) : (
          <>
            <p>Server is currently:</p>

            <h4>Private</h4>
          </>
        )}

        <select value={privacy} onChange={handleChange}>
          {privacy ? (
            <>
              <option selected value={true}>
                Public
              </option>
              <option value={false}>Private</option>
            </>
          ) : (
            <>
              <option selected value={false}>
                Private
              </option>
              <option value={true}>Public</option>
            </>
          )}
        </select>
        <br />
        <label>
          Select your server's privacy. (Public servers can be seen by other
          users)
        </label>
      </div>
      <div className="server-overview-buttons">
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={handleDelete}>Delete Server</button>
      </div>
      {showDeleteModal && (
        <Modal>
          <DeleteConfirmModal
            currServer={currServer}
            setShowDeleteModal={setShowDeleteModal}
            setShowEditModal={setShowEditModal}
            setName={setName}
            setErrors={setErrors}
            setImage={setImage}
          />
        </Modal>
      )}
    </form>
  );
};

export default ServerEditModal;
