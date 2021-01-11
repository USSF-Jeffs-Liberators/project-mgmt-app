import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./views/login-page";
import SignupForm from "./views/signup-page";
import LoggedOut from "./views/loggedout-page";
import DeveloperDashboard from "./views/developer-dashboard";
import ProjectManagerDashboard from "./views/pm-dashboard";
import GeneralManagerDashboard from "./views/gm-dashboard";
import SubmitIssue from "./views/issue-page";

import AuthService from "./services/auth.service";
import HomePage from "./views/HomePage";

export default function Root(props) {
  // mock different User_Types
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  // const user = AuthService.getCurrentUser();
  // if(user){
  //   props = {
  //     userType: user.roles[0],
  //     userId: user.user_id
  //   };
  // } else {
  //   props = {
  //     userType: "public",
  //     userId: -1
  //   };
  // }
  

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
          return <Route exact path="/" component={HomePage} />;
      }
    } else {
      return <Route exact path="/" component={HomePage} />;
    }
    
  };

  return (
    <BrowserRouter>
      {renderSwitch(props.userType)}
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/logout" component={LoggedOut} />
      <Route exact path="/issue" component={SubmitIssue} />
    </BrowserRouter>
  );
}
