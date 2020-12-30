import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function SignupForm(props) {

  return (
    <div id="signupPage">
      <h4>Sign up for an account:</h4>

      <form className="rux-form">
        <div className="rux-form-field">
          <label htmlFor="input__text">Username*</label>
          <input id="input__text" className="rux-input" type="text" required />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="input__password">Password*</label>
          <input
            id="input__password"
            className="rux-input"
            type="password"
            required
          />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="input__name">First Name</label>
          <input
            id="input__first_name"
            className="rux-input"
            type="text"
            placeholder="John"
          />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="input__last_name">Last Name</label>
          <input
            id="input__last_name"
            className="rux-input"
            type="text"
            placeholder="Doe"
          />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="input__email">Email Address*</label>
          <input
            id="input__email"
            className="rux-input"
            type="email"
            placeholder="user@domain.com"
            required
          />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="input__user_type">Role* &nbsp;</label>
          <select class="rux-select">
            <option>Select a user role:</option>
            <option>Developer</option>
            <option>Project Manager</option>
            <option>General Manager</option>
          </select>
        </div>{" "}
        <br />
        <rux-button type="button">Submit</rux-button>
      </form>

      <h6>
        Already have an account? Log in{" "}
        <a onClick={() => history.push("/login")}>here</a>.
      </h6>
    </div>
  );
}
