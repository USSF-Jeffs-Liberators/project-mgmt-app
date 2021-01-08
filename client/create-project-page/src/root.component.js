import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CreateProjectPage from "./components/create-project-page.component";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route exact path="/create-project" component={CreateProjectPage} />
    </BrowserRouter>
  );
}
