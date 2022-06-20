import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createServer } from "../../../../store/server";
import {LoadingModal} from "../../../../context/LoadingModal"

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
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const publicVal = checked;
    const payload = { name, owner_id, publicVal, image };
    await setLoading(true)
    const newServer = await dispatch(createServer(payload));
    if (newServer.errors) {
      // console.log(newEstate.errors)
      await setLoading(false)
      setErrors(newServer.errors);
      return;
    } else {
      setName("");
      setImage(null);
      setChecked(false);
      setShowServerModal(false);
      await setLoading(false)
      history.push(`/channels/${newServer.id}/${newServer.channel_ids[0]}`);
    }
    // hallo
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    setNameError(true);
    if (name.length > 1 && name.length < 27) {
      setNameError(false);
    }

    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image, name]);

  return (
    <>
    {loading && (
      <LoadingModal>
        <img id='loading-image' src="https://c.tenor.com/HJvqN2i4Zs4AAAAi/milk-and-mocha-cute.gif"/>
       </LoadingModal>
    )}
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
        <div className="server-file-upload">
          {preview && (
            <>
              <img
                className="server-image-icon-edit"
                src={preview}
                alt="profile preview"
              ></img>
            </>
          )}
          <label className="custom-file-upload">
            {" "}
            Upload your picture here!{" "}
            <input type="file" accept="image/png, image/jpeg, image/png, image/gif" onChange={updateImage}></input>
          </label>
        </div>
        <div className="private-input">
          <label>Server name</label>
          {nameError && errors && errors.name && (
            <div className="error-msg">
              <p>*{errors.name}*</p>
            </div>
          )}
          <input onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="login-email">
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            ></input>
            Select to make this a public server that others can see!
          </label>
        </div>
        <div className="button-div-user">
          <button id='channel-submit' onClick={handleSubmit}>Create Server</button>
          <button id='channel-submit' onClick={() => setShowServerModal(false)}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default ServerCreateForm;
