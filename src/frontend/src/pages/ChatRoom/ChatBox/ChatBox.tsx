import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Moment from "react-moment";

export interface ChatBoxProps {
  sendMessage: Function;
  messages: Array<string>;
}

const ChatBox: React.SFC<ChatBoxProps> = props => {
  const [message, setMessage] = useState("");
  return (
    <div className="chatArea">
      <Box className="chatMessages">
        <Box className="topBar">13 people joined the room</Box>
        {props.messages && props.messages.length === 0 && (
          <Box textAlign="center" fontSize={20}>
            There are no messages at the moment.
          </Box>
        )}
        {props.messages &&
          props.messages.length > 0 &&
          props.messages.map((message, index) => {
            return (
              <Box key={index} mb={2}>
                <Chip avatar={<Avatar>M</Avatar>} label={message} />
                <Moment className="time" fromNow>
                  2020-02-19T12:59-0500
                </Moment>
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
