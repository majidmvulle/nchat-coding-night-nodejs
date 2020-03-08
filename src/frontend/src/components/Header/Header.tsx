import React from "react";

//assets
import logo from "../../assets/img/logo.svg";
import back from "../../assets/img/arrow_back.svg";
import "./Header.css";

// material ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

export interface HeaderProps {
  title: string;
}

const Header: React.SFC<HeaderProps> = props => {
  const { title } = props;

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => window.history.back()}
          >
            <img src={back} />
          </IconButton>
          <Typography variant="h6" className="title">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
