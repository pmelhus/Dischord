import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editChannel } from "../../../store/channel";
import { useLocation } from "react-router-dom";

const EditChannelForm2 = ({setShowEditForm2, channel }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful

  const dispatch = useDispatch();
  const { pathname } = useLocation();


  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = channel.id;
    const server_id = channel.server_id
    const payload = { id, name, description, server_id };

    const editedChannel = await dispatch(editChannel(payload));
    if (editedChannel.errors) {
      // console.log(newEstate.errors)
      setErrors(editedChannel.errors);
      return;
    } else {
      setName("");
      setDescription("");
      setShowEditForm2(false)
    }
  };


  return (
    <>
      <form className="server-create-form">
        <div className="server-create-form-msg">
          <h2>Edit Channel</h2>
        </div>
        <div>
          <label>Channel name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="form-errors">
            {Object.keys(errors).map(
              // (key) => `${errors[key]}`
              (key) => `${errors[key]}`
            )}
          </div>
        )}
        <button onClick={handleSubmit}>Save Changes</button>
      </form>
    </>
  );
};

export default EditChannelForm2;
