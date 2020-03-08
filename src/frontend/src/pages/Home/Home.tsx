import React from "react";

//Components

// material ui
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

// assets
import "./Home.css";
import logo from "../../assets/img/logo.svg";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="homeContainer">
      <img src={logo} alt="" />
      
      <Box fontSize="h3.fontSize" mb={5} fontWeight="bold">
        Keep the conversations going with NChat
      </Box>

      <Box mb={4}>
        <Button variant="contained" color="primary" size="large" href="/create">
          Create a Room
        </Button>
      </Box>

      <Box mb={4}>
        <Button variant="outlined" color="primary" size="large" href="/join">
          Join a Room
        </Button>
      </Box>

    </div>
  );
};

export default Home;
