import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Moment from "react-moment";
import Box from "@material-ui/core/Box";

export interface MessageProps {
    messages: Array<string>;
}

const Message: React.FC<MessageProps> = (props) => {
  return (
    <>
      {props.messages && props.messages.length === 0 && (
        <Box textAlign="center" fontSize={20}>
          There are no messages at the moment.
        </Box>
      )}
      {props.messages &&
        props.messages.length > 0 &&
        props.messages.map((message, index) => {
          return (
            <Box key={index} mb={2} className="chipContainer">
              <Chip avatar={<Avatar>M</Avatar>} label={message} />
              <Moment className="time" fromNow>
                2020-03-01T12:59-0500
              </Moment>
            </Box>
          );
        })}
    </>
  );
};

export default Message;
