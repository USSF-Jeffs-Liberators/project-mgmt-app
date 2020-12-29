import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function LoggedOut(props) {
  const style = { "text-align": "center", "margin-top": "100px" };

  return (
    <h5 style={style}>
      You are not logged in.
      <br />
      <a onClick={() => history.push("/login")}>Log in</a> or&nbsp;
      <a onClick={() => history.push("/signup")}>Sign up</a>
    </h5>
  );
}
