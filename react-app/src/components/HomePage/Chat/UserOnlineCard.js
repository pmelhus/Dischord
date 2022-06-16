const UserOnlineCard = ({ currentServer, currentServerMemberIds, user }) => {
  return (
    <div className="online-card-container">
     
      <div className="invite-image-username">
        <img className="server-image-icon" src={user.image_url}/>
      <p>{user.username}</p>
      {currentServer.owner_id === user.id && (
        <i id="crown" className="fa-solid fa-crown"></i>
      )}
      </div>
    </div>
  );
};

export default UserOnlineCard
