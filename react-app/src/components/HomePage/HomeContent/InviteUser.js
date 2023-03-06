import { useSelector, useDispatch } from "react-redux";
import InviteUserItem from './InviteUserItem.js'

const InviteUser = ({sessionUser, socket, currentServer, setInviteModal}) => {
  const dispatch = useDispatch();

  const users = useSelector(state=> state.users)
  const serverMembers = useSelector(state => state.servers)[currentServer.id].members_ids
  const friendships = useSelector((state) => Object.values(state.friends.friendships))

const friendsList = []

  friendships.forEach(friendship => {
    if (friendship.self_id === sessionUser.id) {
      friendsList.push(users[friendship.friend_id])
    }
    if (friendship.friend_id === sessionUser.id) {
      friendsList.push(users[friendship.self_id])
    }
  })



  return (
    <div className='invite-user-container'>
      {/* <div className='user-search'>
        <input></input>
      </div> */}
      <div className="invite-user-heading">
        <h3>Invite people to your server!</h3>
      </div>
      <div className="invite-user-list">
        <ul>
          {friendsList?.map((user) => {

            return (
              <div style={{padding:'8px 0'}} className="invite-user-item-div">
                <InviteUserItem {...{socket}} {...{setInviteModal}} {...{currentServer}} {...{user}}/>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InviteUser;
