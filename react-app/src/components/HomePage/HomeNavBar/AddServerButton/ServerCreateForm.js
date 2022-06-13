import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createServer } from "../../../../store/server";

const ServerCreateForm = ({ setShowServerModal }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const owner_id = useSelector((state) => state.session.user.id);
  const [imageError, setImageError] = useState(true);
  const [nameError, setNameError] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const publicVal = checked;
    const payload = { name, owner_id, publicVal, image };
    const newServer = await dispatch(createServer(payload));
    if (newServer.errors) {
      // console.log(newEstate.errors)
      setErrors(newServer.errors);
      return;
    } else {
      setName("");
      setImage(null);
      setChecked(false);
      setShowServerModal(false);
    }
    // hallo
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    setNameError(true);
    if (name.length > 1 && name.length < 33) {
      setNameError(false);
    }
  }, [name]);

  return (
    <>
      <form className="server-create-form">
        <div className="server-create-form-msg">
          <h2>Customize your server</h2>
          <p>
            Give your new server a personality with a name and an icon.<br></br>{" "}
            You can always change it later.
          </p>
        </div>
        {imageError && errors && errors.image_url && (
          <div className="error-msg">
            <p>*{errors?.image_url}*</p>
          </div>
        )}
        <div>
          <input type="file" accept="image/*" onChange={updateImage}></input>
        </div>
        <div>
          <label>Server name</label>
          {nameError && errors && errors.name && (
            <div className="error-msg">
              <p>*{errors.name}*</p>
            </div>
          )}
          <input onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            ></input>
            Select to make this a public server that others can see!
          </label>
        </div>
        <button onClick={handleSubmit}>Create Server</button>
      </form>
    </>
  );
};

export default ServerCreateForm;
