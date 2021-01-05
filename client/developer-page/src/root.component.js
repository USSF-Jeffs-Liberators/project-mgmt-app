import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DeveloperPage from "./a/developer-page.component";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route exact path="/developer-page" component={DeveloperPage} />
    </BrowserRouter>
  );
}
