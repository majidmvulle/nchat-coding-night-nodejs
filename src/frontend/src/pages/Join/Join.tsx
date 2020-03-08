import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export interface JoinProps {}

const Join: React.SFC<JoinProps> = () => {
  const [roomID, setRoomID] = useState();
  const [userName, setUserName] = useState();

  const submit = () => {
    console.log(roomID, userName); // TODO;
  };
  return (
    <div>
      <Header title="Join Chat Room" />
      <form className="createForm" autoComplete="off">
        <Box mb={3} width={360}>
          <TextField
            fullWidth
            id="roomID"
            label="Room ID"
            variant="outlined"
            onChange={event => setRoomID(event.target.value)}
          />
        </Box>
        <Box mb={3} width={360}>
          <TextField
            fullWidth
            id="userName"
            label="User Name"
            variant="outlined"
            onChange={event => setUserName(event.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => submit()}
          >
            Join Room
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Join;