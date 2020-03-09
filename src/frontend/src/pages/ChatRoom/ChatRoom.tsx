import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import Guests from "./Guests/Guests";
import "./ChatRoom.css";
import ChatBox from "./ChatBox/ChatBox";

export interface ChatRoomProps {}

const ChatRoom: React.SFC<ChatRoomProps> = props => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message: any[]) => {
    let newMessages: any = [message, ...messages];
    setMessages(newMessages);
  };

  const sendMessage = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      // console.log(event.target.value);
      addMessage(event.target.value);
    }
  };

  return (
    <>
      <Header title="Chat Room" />
      <Grid className="chatContainer" container spacing={3}>
        <Grid item xs={9}>
          <ChatBox sendMessage={sendMessage} messages={messages} />
        </Grid>
        <Grid className="guestListContainer" item xs={3}>
          <Guests {...props} />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatRoom;
