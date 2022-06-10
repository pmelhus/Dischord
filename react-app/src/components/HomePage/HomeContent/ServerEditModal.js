import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { editServer, deleteServer } from "../../../store/server";

const ServerEditModal = ({ setShowEditModal }) => {
  const { pathname } = useLocation();
  const servers = useSelector((state) => Object.values(state.servers));
  const currServer = servers?.find(
    (server) => server.id === parseInt(pathname.split("/").pop())
  );
  const sessionUserId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const [privacy, setPrivacy] = useState(currServer?.public);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(currServer?.name);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  // console.log(currServer)

  const handleChange = (e) => {
    // console.log(e.target.value)
    setPrivacy(e.target.value);
  };
  // console.log(privacy)

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner_id = currServer?.owner_id;
    const id = currServer?.id;
    const payload = { id, name, privacy, image, owner_id };
    // console.log(payload)
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

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedServer = await dispatch(deleteServer(currServer));
    if (deletedServer && deletedServer.errors) {
      // console.log(newEstate.errors)
      setErrors(deletedServer.errors);
      return;
    } else {
      setName("");
      setImage(null);
      setShowEditModal(false);
      history.push("/channels/@me");
    }
  };

  return (
    <form>
      <div className="server-edit-form-msg">
        <h2>Server Overview</h2>
      </div>
      <div>
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
        <label>Upload image</label>
        <input type="file" accept="image/*" onChange={updateImage}></input>
      </div>
      <div>
        <label>Server name</label>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div>
        <label>
          {currServer?.public ? (
            <>
              <p>Server is currently</p>
              <h4>Public</h4>
            </>
          ) : (
            <>
              <p>Server is currently:</p>

              <h4>Private</h4>
            </>
          )}
          <select onChange={handleChange}>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>
          Select your server's privacy. (Public servers can be seen by other
          users)
        </label>
      </div>
      <div className="server-overview-buttons">
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={handleDelete}>Delete Server</button>
      </div>
    </form>
  );
};

export default ServerEditModal;
