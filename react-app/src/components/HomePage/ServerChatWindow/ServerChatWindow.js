import Chat from "../Chat/Chat"
import ServerChatHeader from "./ServerChatHeader"

const ServerChatWindow = ({setLoading}) => {

  return (
    <div className="server-chat-container">
      <ServerChatHeader/>
      <Chat {...{setLoading}}/>
    </div>
  )
}

export default ServerChatWindow
