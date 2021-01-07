import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function LoggedOut(props) {

  return (
    <div id="loggedOutPage">
      <h5>
        You are not logged in.
        <br />
        <a className="loginLink" onClick={() => history.push("/login")}>Log in</a> or&nbsp;
        <a className="signupLink" onClick={() => history.push("/signup")}>Sign up</a>
      </h5>
    </div>
  );
}
