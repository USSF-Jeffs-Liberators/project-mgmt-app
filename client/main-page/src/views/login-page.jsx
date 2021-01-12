import { createBrowserHistory } from "history";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const history = createBrowserHistory();
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function LoginForm(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [pass_word, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const pass_word = e.target.value;
    setPassword(pass_word);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, pass_word).then(
        () => {
          props.history.push("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div id="loginPage">
      <h4>Log in to view your Dashboard:</h4>

      <Form className="rux-form" onSubmit={handleLogin} ref={form}>
        <div className="rux-form-field">
          <label htmlFor="username">Username </label>
          <Input
            type="username"
            className="rux-input"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />
        </div>{" "}
        <br />
        <div className="rux-form-field">
          <label htmlFor="password">Password </label>
          <Input
            type="password"
            className="rux-input"
            name="password"
            value={pass_word}
            onChange={onChangePassword}
            validations={[required]}
          />
        </div>{" "}
        <br />
        <div className="rux-form">
          <button className="rux-button" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>
        {message && (
          <div className="rux-form">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <h6>
        Need an account? Sign up{" "}
        <a className="signupLink" onClick={() => history.push("/signup")}>
          here
        </a>
        .
      </h6>
    </div>
  );
}
