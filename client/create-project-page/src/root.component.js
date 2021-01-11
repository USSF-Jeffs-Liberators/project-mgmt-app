import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./altcomponents/App";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route exact path="/create-project" component={App} />
    </BrowserRouter>
  );
}
