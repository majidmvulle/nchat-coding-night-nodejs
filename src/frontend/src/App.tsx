import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import Join from "./pages/Join/Join";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Create from "./pages/Create/Create";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
