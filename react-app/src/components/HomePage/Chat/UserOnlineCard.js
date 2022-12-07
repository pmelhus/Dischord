
import {useState} from "react"
import {UserModal} from "../../../context/UserModal"
import UserModalWindow from "../../Modals/UserModalWindow"

const UserOnlineCard = ({ currentServer, currentServerMemberIds, user }) => {

const [userModal, setUserModal] = useState(false)

const hoverFunction = () => {
  setUserModal(true)
  console.log('HALLO')
}

  return (
    <>
    {userModal && (
      <UserModal onClose={() => setUserModal(false)}>
        <UserModalWindow/>
      </UserModal>
    )}
    <div className="online-card-container">

      <div className="invite-image-username" onClick={hoverFunction}>
        {user.image_url ? (
          <img className="server-online-image" src={user.image_url}/>
        ): (
          <>
          <div className="user-online-image-nourl">
            <i className="fa-solid fa-user-music"></i>
          </div>
        </>
        )

        }
      <p>{user.username}</p>
      {currentServer.owner_id === user.id && (
        <i id="crown" className="fa-solid fa-crown"></i>
      )}
      </div>
    </div>

    </>
  );
};

export default UserOnlineCard
