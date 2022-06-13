const ChannelMessage = ({user, message}) => {
  return (
    <>
                  {user.image_url ? (
                <img
                  className="channel-chat-profile-image"
                  alt="profile"
                  src={user.image_url}
                />
              ) : (
                <div className="channel-chat-profile-image">
                  <i className="fa-solid fa-user-music"></i>
                </div>
              )}
              <div className="channel-chat-user-msg">
                <h4>{user.username}</h4>
                <p>{`${message.msg}`}</p>
              </div>
    </>
  )
}

export default ChannelMessage
