import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FinancePage from "./a/finance-page.component";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route exact path="/finance" component={FinancePage} />
    </BrowserRouter>
  );
}
