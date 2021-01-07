import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function LoginForm(props) {

  return (
    <div id="loginPage">
      <h4>Log in to view your Dashboard:</h4>

      <form className="rux-form">
        <div className="rux-form-field">
          <label htmlFor="input__text">Username</label>
          <input id="input__text" className="rux-input" type="text" required />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="input__password">Password</label>
          <input
            id="input__password"
            className="rux-input"
            type="password"
            required
          />
        </div>{" "}
        <br />
        <rux-button type="button">Submit</rux-button>
      </form>

      <h6>
        Need an account? Sign up{" "}
        <a className="signupLink" onClick={() => history.push("/signup")}>here</a>.
      </h6>
    </div>
  );
}
