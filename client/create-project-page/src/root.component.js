import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";

export default function Root(props) {
  const [currentUser, setCurrentUser] = useState({ roles: [""] });
  var localUser;
  useEffect(() => {
    localUser = JSON.parse(localStorage.getItem("user"));
    const localToCurrent = async () => {
      setCurrentUser(localUser);
    };
    localToCurrent();
  }, [localStorage.getItem("user"), localUser]);

  const renderSwitch = () => {
    if (currentUser["roles"] !== "") {
      switch (currentUser.roles[0]) {
        case "General Manager":
          return <Route exact path="/create-project" component={App} />;
        case "Administrator":
          return <Route exact path="/create-project" component={App} />;
        case undefined:
          return <div> undefined </div>;
        default:
          return (
            // <Route exact path="/create-project">
            //   <Redirect to="/" />
            // </Route>
            <div> {currentUser.roles[0]} </div>
          );
      }
    } else {
      return <div> eh </div>;
    }
  };

  return <BrowserRouter>{renderSwitch(props.userType)}</BrowserRouter>;
}
