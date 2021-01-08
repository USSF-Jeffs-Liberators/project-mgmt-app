import React, { useState, useRef } from "react";
import { createBrowserHistory } from "history";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const history = createBrowserHistory();

export default function SignupForm(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };
  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };
  const onChangeRole = (e) => {
    const role = [e.target.value];
    setRole(role);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        password,
        firstname,
        lastname,
        role
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div id="signupPage">
      <h4>Sign up for an account:</h4>
      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username*</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                placeholder="user@domain.com"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input__name">First Name*</label>
              <Input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Wade"
                value={firstname}
                onChange={onChangeFirstname}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input__last_name">Last Name*</label>
              <Input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Wilson"
                value={lastname}
                onChange={onChangeLastname}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input__user_type">Role* &nbsp;</label>
              <Select
                name="role"
                value={role}
                onChange={onChangeRole}
                validations={[required]}
              >
                <option value="">Select a user role:</option>
                <option value="Developer">Developer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="General Manager">General Manager</option>
              </Select>
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      {/* <form className="rux-form">
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
      </form> */}

      <h6>
        Already have an account? Log in{" "}
        <a className="loginLink" onClick={() => history.push("/login")}>
          here
        </a>
        .
      </h6>
    </div>
  );
}
