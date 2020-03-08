import React from "react";
import Header from "../../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import Guests from "./Guests/Guests";
import "./ChatRoom.css";

export interface ChatRoomProps {}

const ChatRoom: React.SFC<ChatRoomProps> = () => {
  return (
    <>
      <Header title="Chat Room" />
      <Grid className="chatContainer" container spacing={3}>
        <Grid item xs={9}>
          <div>Chat room</div>
        </Grid>
        <Grid className="guestListContainer" item xs={3}>
          <Guests />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatRoom;
