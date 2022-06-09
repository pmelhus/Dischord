import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createServer } from "../../../../store/server";

const ServerCreateForm = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const user_id= useSelector(state => state.session.user.id)

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const publicVal = checked
  const payload = {name, user_id, publicVal, image}
  dispatch(createServer(payload))
// hallo
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <>
      <form className="server-create-form">
        <label>Upload</label>
        <input type="file" accept="image/*" onChange={updateImage}></input>
        <label>Server name</label>
        <input onChange={(e) => setName(e.target.value)}></input>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          ></input>
          Select to make this a public server that others can see!
        </label>
        <button onClick={handleSubmit}>Create Server</button>
      </form>
    </>
  );
};

export default ServerCreateForm;
