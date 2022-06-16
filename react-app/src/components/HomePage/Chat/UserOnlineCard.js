const UserOnlineCard = ({ currentServer, currentServerMemberIds, user }) => {
  return (
    <div className="online-card-container">

      <div className="invite-image-username">
        {user.image_url ? (
          <img className="server-image-icon" src={user.image_url}/>


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
  );
};

export default UserOnlineCard
