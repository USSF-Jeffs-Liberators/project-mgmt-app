import React from "react";
import TeamRoster from "./team-roster/team-roster.component.js";

export default function UsersService(props) {
  return (
    <BrowserRouter>
      <Route path="/team-roster" component={TeamRoster} exact />
    </BrowserRouter>
  )
}
