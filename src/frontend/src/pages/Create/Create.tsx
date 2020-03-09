import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import "./Create.css";
import API from "../../services/api";
import { useHistory } from "react-router-dom";

export interface CreateProps {}

const Create: React.SFC<CreateProps> = () => {
  const [roomName, setRoomName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [roomError, setRoomError] = useState(false);
  const [userError, setuserError] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const history = useHistory();

  const submit = () => {
    if (!roomName || roomName === "") {
      setRoomError(true);
    } else {
      setRoomError(false);
    }

    if (!userName || userName === "") {
      setuserError(true);
    } else {
      setuserError(false);
    }

    if (!password || password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (roomName && userName && password) {
      API.post(`rooms`, {
        name: roomName,
        username: userName,
        password: password
      }).then(response => {
        if (response.status === 200) {
          // console.log(response.data.code);
          history.push(`chat/${response.data.code}`);
        }
      });
    }

    // console.log(roomName, userName, password); // TODO;
  };

  return (
    <div>
      <Header title="Create Chat Room" />
      <form className="createForm" autoComplete="off">
        <Box mb={3} width={360}>
          <TextField
            error={roomError}
            fullWidth
            id="roomName"
            label="Room Name"
            variant="outlined"
            onChange={event => setRoomName(event.target.value)}
          />
        </Box>
        <Box mb={3} width={360}>
          <TextField
            error={userError}
            fullWidth
            id="userName"
            label="User Name"
            variant="outlined"
            onChange={event => setUserName(event.target.value)}
          />
        </Box>
        <Box mb={3} width={360}>
          <TextField
            error={passwordError}
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={event => setPassword(event.target.value)}
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
