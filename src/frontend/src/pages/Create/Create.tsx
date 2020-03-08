import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import "./Create.css";

export interface CreateProps {}

const Create: React.SFC<CreateProps> = () => {
  const [roomName, setRoomName] = useState();
  const [userName, setUserName] = useState();

  const submit = () => {
    console.log(roomName, userName); // TODO;
  };

  return (
    <div>
      <Header title="Create Chat Room" />
      <form className="createForm" autoComplete="off">
        <Box mb={3} width={360}>
          <TextField
            fullWidth
            id="roomName"
            label="Room Name"
            variant="outlined"
            onChange={event => setRoomName(event.target.value)}
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
            Create Room
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Create;
