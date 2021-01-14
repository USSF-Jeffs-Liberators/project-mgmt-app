import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./views/login-page";
import SignupForm from "./views/signup-page";
import LoggedOut from "./views/loggedout-page";
import DeveloperDashboard from "./views/developer-dashboard";
import ProjectManagerDashboard from "./views/pm-dashboard";
import GeneralManagerDashboard from "./views/gm-dashboard";

import AuthService from "./services/auth.service";

export default function Root(props) {
  // mock different User_Types
  
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  

  // "/" path will render a different page depending on user type
  const renderSwitch = () => {
    if(currentUser){
      switch (currentUser.roles[0]) {
        case "Developer":
          return <Route exact path="/" component={DeveloperDashboard} />;
        case "Project Manager":
          return <Route exact path="/" component={ProjectManagerDashboard} />;
        case "General Manager":
          return <Route exact path="/" component={GeneralManagerDashboard} />;
        default:
          return <Route exact path="/" component={LoggedOut} />;
      }
    } else {
      return <Route exact path="/" component={LoggedOut} />;
    }
  };

  return (
    <BrowserRouter>
      {renderSwitch(props.userType)}
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/logout" component={LoggedOut} />
    </BrowserRouter>
  );
}
