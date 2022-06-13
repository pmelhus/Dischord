import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../../../store/channel";
import { useLocation } from "react-router-dom";

const CreateChannelForm = ({ setShowChannelForm }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful

  const { pathname } = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [nameError, setNameError] = useState(true)
  const [descriptionError, setDescriptionError] = useState(true)

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const server_id = parseInt(pathname.split("/")[2]);

    const payload = { name, description, server_id };
    const newChannel = await dispatch(createChannel(payload));
    //  console.log(newChannel)
    if (newChannel.errors) {
      console.log(newChannel.errors);
      setErrors(newChannel.errors);
      return;
    } else {
      setName("");
      setDescription("");
      setShowChannelForm(false);
    }
  };

useEffect(()=> {
  setNameError(true)
  setDescriptionError(true)
  if (name.length > 1 && name.length < 33) {
    setNameError(false)
  }
  if (description.length < 255) {
    setDescriptionError(false)
  }
},[name, description])

  return (
    <>
      <form className="server-create-form">
        <div className="server-create-form-msg">
          <h2>Create Channel</h2>
        </div>
        <div>
          <label>Channel name</label>
          {nameError && errors && errors.name && (
            <div className='error-msg'>
              <p>*{errors.name}*</p>
            </div>
          )}
          <input onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label>Description</label>
          {descriptionError && errors && errors.description && (
            <div className='error-msg'>
              <p>*{errors.description}*</p>
            </div>
          )}
          <input onChange={(e) => setDescription(e.target.value)}></input>
        </div>
        {/* {Object.keys(errors).length > 0 && (
				<div className="form-errors">
					{Object.keys(errors).map(
						// (key) => `${errors[key]}`
						(key) => `${errors[key]}`
					)}
				</div>
			)} */}
        <button onClick={handleSubmit}>Create Channel</button>
      </form>
    </>
  );
};

export default CreateChannelForm;
