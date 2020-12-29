import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./login.component";
import SignupForm from "./signup.component";
import LoggedOut from "./loggedout.component";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoggedOut} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
    </BrowserRouter>
  );
}

// switch case dependant on User_Type
// case "Developer", render developer view
// case "Project Manager", render PM view
// case "General Manager", render GM view
// default is logged out view, which displays text "Log in or sign Up to view Dashboard"
