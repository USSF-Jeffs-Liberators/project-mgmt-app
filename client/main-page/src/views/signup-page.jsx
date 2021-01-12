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
      <Form className="rux-form" onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="rux-form-field">
              <label htmlFor="username">Username*</label>
              <Input
                type="text"
                className="rux-input"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>{" "}
            <br />
            <div className="rux-form-field">
              <label htmlFor="email">Email*</label>
              <Input
                type="text"
                className="rux-input"
                name="email"
                placeholder="user@domain.com"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>{" "}
            <br />
            <div className="rux-form-field">
              <label htmlFor="input__name">First Name*</label>
              <Input
                type="text"
                className="rux-input"
                name="first_name"
                placeholder="Wade"
                value={firstname}
                onChange={onChangeFirstname}
                validations={[required]}
              />
            </div>{" "}
            <br />
            <div className="rux-form-field">
              <label htmlFor="input__last_name">Last Name*</label>
              <Input
                type="text"
                className="rux-input"
                name="last_name"
                placeholder="Wilson"
                value={lastname}
                onChange={onChangeLastname}
                validations={[required]}
              />
            </div>{" "}
            <br />
            <div className="rux-form-field">
              <label htmlFor="password">Password*</label>
              <Input
                type="password"
                className="rux-input"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>{" "}
            <br />
            <div className="rux-form-field">
              <label htmlFor="input__user_type">Role* &nbsp;</label>
              <Select
                name="role"
                className="rux-select"
                value={role}
                onChange={onChangeRole}
                validations={[required]}
              >
                <option value="">Select a user role:</option>
                <option value="Developer">Developer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="General Manager">General Manager</option>
              </Select>
            </div>{" "}
            <br />
            <div className="rux-form">
              <button className="rux-button">Sign Up</button>
            </div>
          </div>
        )}

        {message && (
          <div className="rux-form">
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
