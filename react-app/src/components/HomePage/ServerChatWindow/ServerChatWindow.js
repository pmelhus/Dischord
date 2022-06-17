import Chat from "../Chat/Chat"
import ServerChatHeader from "./ServerChatHeader"
import {useSelector} from "react-redux"

const ServerChatWindow = ({setOnlineMembers, onlineMembers, socket, setLoading}) => {

  return (
    <div className="server-chat-container">
      <ServerChatHeader/>
      <Chat {...{onlineMembers}} {...{setOnlineMembers}} {...{socket}} {...{setLoading}}/>

    </div>
  )
}

export default ServerChatWindow
