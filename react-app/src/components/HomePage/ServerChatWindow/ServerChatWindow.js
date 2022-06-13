import Chat from "../Chat/Chat"
import ServerChatHeader from "./ServerChatHeader"

const ServerChatWindow = () => {

  return (
    <div className="server-chat-container">
      <ServerChatHeader/>
      <Chat/>
    </div>
  )
}

export default ServerChatWindow
