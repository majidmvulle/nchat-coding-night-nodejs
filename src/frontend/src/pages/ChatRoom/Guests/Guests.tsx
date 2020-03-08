import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

export interface GuestsProps {}

const Guests: React.SFC<GuestsProps> = () => {
  return (
    <List className="guestList">
      <ListSubheader className="subheader">Chat Room Guests</ListSubheader>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(value => {
        return (
          <ListItem key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`https://avatars.dicebear.com/v2/male/°${value + 1}.svg`}
              />
            </ListItemAvatar>
            <ListItemText primary={`Guest name ${value + 1}`} />
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
