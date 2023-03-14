import { useSelector, useDispatch } from "react-redux";
import InviteUserItem from './InviteUserItem.js'

const InviteUser = ({sessionUser, socket, currentServer, setInviteModal}) => {
  const dispatch = useDispatch();

  const users = useSelector(state=> state.users)
  const serverMembers = useSelector(state => state.servers)[currentServer.id].members_ids
  const friendships = useSelector((state) => Object.values(state.friends.friendships))

  const currentServerMembers = currentServer.members_ids
  const memberIds = currentServerMembers.map(user => {
    return user.user_id
  })
  console.log(memberIds, "IDS HERE")

const friendsList = []

  friendships.forEach(friendship => {
    if (friendship.self_id === sessionUser.id) {
      friendsList.push(users[friendship.friend_id])
    }
    if (friendship.friend_id === sessionUser.id) {
      friendsList.push(users[friendship.self_id])
    }
  })

const filteredFriendsList = friendsList.filter(friend => (!memberIds.includes(friend.id)))
console.log(filteredFriendsList, 'FILTERED FRIENDS')

  return (
    <div className='invite-user-container'>
      {/* <div className='user-search'>
        <input></input>
      </div> */}
      <div className="invite-user-heading">
        <h3>Invite friends to your server!</h3>
      </div>
      <div className="invite-user-list">
        <ul>
          {filteredFriendsList?.map((user) => {

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
