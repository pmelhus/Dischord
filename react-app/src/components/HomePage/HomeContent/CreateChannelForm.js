import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../../../store/channel"
import {useLocation} from "react-router-dom"

const CreateChannelForm = ({setShowChannelForm}) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful

  const {pathname} = useLocation()
  const [name, setName] = useState("");
  const [description, setDescription] = useState('')
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const server_id = parseInt(pathname.split('/')[2])

    const payload = { name, description, server_id};
   const newChannel = await dispatch(createChannel(payload));
		if (newChannel.errors) {
			// console.log(newEstate.errors)
			setErrors(newChannel.errors)
			return;
		} else {
      setName('')
      setDescription('')
      setShowChannelForm(false)
		}

  };


  return (
    <>
      <form className="server-create-form">
        <div className="server-create-form-msg">
          <h2>Create Channel</h2>
        </div>
        <div>
          <label>Channel name</label>
          <input onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label>Description</label>
          <input onChange={(e) => setDescription(e.target.value)}></input>
        </div>
        {Object.keys(errors).length > 0 && (
				<div className="form-errors">
					{Object.keys(errors).map(
						// (key) => `${errors[key]}`
						(key) => `${errors[key]}`
					)}
				</div>
			)}
        <button onClick={handleSubmit}>Create Channel</button>
      </form>
    </>
  );
};

export default CreateChannelForm;