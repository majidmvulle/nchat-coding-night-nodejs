import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import openSocket from "socket.io-client";
import API from "../../../services/api";

export interface GuestsProps {}

const Guests: React.SFC<GuestsProps> = props => {
  const [guestsList, setGuestsList] = useState();

  useEffect(() => {
    let roomID = window.location.pathname.substring(6);
    // console.log(roomID);
    API.get(`rooms/${roomID}`).then(res => {
      if (res.status === 200) {
        setGuestsList(res.data.usersJoined);
      }
    });

    const socket = openSocket("http://localhost:8080");
    // console.log(socket);
    socket.on("chat message", (data: any) => console.log(data));
  }, []);

  return (
    <List className="guestList">
      {console.log(guestsList)}
      <ListSubheader className="subheader">Chat Room Guests</ListSubheader>
      {guestsList &&
        guestsList.length > 0 &&
        guestsList.map((guest: any, index: any) => {
          return (
            <ListItem key={index} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${guest.username}`}
                  src={`https://avatars.dicebear.com/v2/male/°${guest.username}.svg`}
                />
              </ListItemAvatar>
              <ListItemText primary={guest.username} />
              <ListItemSecondaryAction>
                <Button size="small" variant="outlined" color="primary">
                  Direct Message
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
};

export default Guests;
