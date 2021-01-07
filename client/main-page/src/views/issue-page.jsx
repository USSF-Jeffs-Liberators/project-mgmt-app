import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function SubmitIssue(props) {

    return (
      <div id="loginpage">
        <h4>Input the Project Id, a description of your issue, and the priority of the issue</h4>
  
        <form className="rux-form">
          <div className="rux-form-field">
            <label htmlFor="input__text">Project Id</label>
            <input id="input__text" className="rux-input" type="number" required />
          </div>{" "}
          <br />
          <div className="rux-form-field">
            <label htmlFor="input__text">Issue Description</label>
            <input id="input__text" className="rux-input" type="text" required />
          </div>{" "}
          <br />
          <div className="rux-form-field">
            <label htmlFor="input__text">Priority</label>
            <select id="input__text" className="rux-input" type="text" required>
              <option value = "low">Low</option>
              <option value = "medium">Medium</option>
              <option value = "high">High</option>
            </select>
          </div>{" "}
          <br />
          <rux-button type="button">Submit Issue</rux-button>
        </form>
  
      </div>
    );
  }
  