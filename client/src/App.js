import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Signup } from "./components/Signup/Signup";
import { Chat } from "./components/Chat/Chat";
import "./App.css";
import { Navbar } from "./components/Navbr/Navbar";

function App() {
  const [user, setUser] = useState({ username: "", room: "" });
  const handleSubmit = user => {
    setUser(user);
  };

  return (
    <Router>
      <Navbar user={user} />
      <div className="container">
        <div className="app__container">
          <Switch>
            <Route
              path="/sign-up"
              render={() => <Signup onSubmit={handleSubmit} />}
            />
            {user.username && user.room && (
              <Route path="/chat" render={() => <Chat />} />
            )}
            <Redirect path="/" to="/sign-up" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
