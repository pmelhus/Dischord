import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ServerEditModal = () => {
  const { pathname } = useLocation();

  const [privacy, setPrivacy] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const sessionUserId = useSelector((state) => state.session.user.id);
  const servers = useSelector((state) => Object.values(state.servers));
  const currServer = servers?.find(
    (server) => server.id === parseInt(pathname.split("/").pop())
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const publicVal = privacy;
    const payload = { name, privacy, image };

  };

  return (
    <form>
      <div className="server-edit-form-msg">
        <h2>Edit your server</h2>
      </div>
      <div>
        <img
          alt="profile preview"
          className="server-image-icon-edit"
          src={currServer.image_url}
        />
        <label>Upload image</label>
        <input type="file" accept="image/*" onChange={updateImage}></input>
      </div>
      <div>
        <label>Server name</label>
        <input
          value={currServer.name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label>
          {currServer.public ? (
            <p>
              Server is currently<h4>Public</h4>
            </p>
          ) : (
            <p>
              Server is currently: <h4>Private</h4>
            </p>
          )}
          <select onChange={handleChange}>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>
          Select your server's privacy. (Public servers can be seen by other
          users)
        </label>
      </div>
      <button onClick={handleSubmit}>Save Changes</button>
    </form>
  );
};

export default ServerEditModal;
