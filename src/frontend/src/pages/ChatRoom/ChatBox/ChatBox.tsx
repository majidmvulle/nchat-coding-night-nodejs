import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

export interface ChatBoxProps {
  sendMessage: Function;
  messages: Array<string>;
}

const ChatBox: React.SFC<ChatBoxProps> = props => {
  const [message, setMessage] = useState("");
  return (
    <div className="chatArea">
      <Box className="chatMessages">
        {props.messages &&
          props.messages.length > 0 &&
          props.messages.map((message, index) => {
            return (
              <Box key={index} mb={2}>
                <Chip avatar={<Avatar>M</Avatar>} label={message} />
              </Box>
            );
          })}
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
