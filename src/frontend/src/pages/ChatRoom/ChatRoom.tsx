import React from "react";

import Header from "../../components/Header/Header";

export interface ChatRoomProps {}

const ChatRoom: React.SFC<ChatRoomProps> = () => {
  return (
    <>
      <Header title="Chat Room" />
      <div>Chat room</div>
    </>
  );
};

export default ChatRoom;
