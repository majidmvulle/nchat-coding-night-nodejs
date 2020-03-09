import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Message from "../../../components/Message/Message";

export interface ChatBoxProps {
  sendMessage: Function;
  messages: Array<string>;
}

const ChatBox: React.FC<ChatBoxProps> = props => {
  const [message, setMessage] = useState("");
  return (
    <div className="chatArea">
      <Box className="chatMessages">
        <Box className="topBar">13 people joined the room</Box>
        <Message messages={props.messages} />
      </Box>

      <Box className="chatTextarea">
        <TextField
          fullWidth
          id="sendMessageField"
          label="Send message"
          variant="filled"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={event => {
            props.sendMessage(event);
            if (event.key === "Enter") {
              setMessage("");
            }
          }}
        />
      </Box>
    </div>
  );
};

export default ChatBox;
