import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function LoggedOut(props) {

  return (
    <div id="loggedOutPage">
      <h3><img src="/static/img/animation.gif" alt="rocket blasting off"></img></h3>
        <h3>You are not logged in.</h3>
        <h5>
        <a className="loginLink" onClick={() => history.push("/login")}>Log in</a> or&nbsp;
        <a className="signupLink" onClick={() => history.push("/signup")}>Sign up</a>
      </h5>
    </div>
  );
}
