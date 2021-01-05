import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DeveloperIssueTracker from "./a/developer-issue-tracker.component";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route exact path="/developer-issue-tracker" component={DeveloperIssueTracker} />
    </BrowserRouter>
  );
}
