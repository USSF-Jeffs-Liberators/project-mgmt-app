import React from "react";

export default function Root(props) {
  const formStyle = {"max-width": "300px", margin: "auto", "margin-top": "100px"}

  return  (
    <div style={formStyle}>
      <h4>Log in to view your Dashboard:</h4>

      <form className="rux-form">
        <div className="rux-form-field">
          <label htmlFor="input__text">Username</label>
          <input id="input__text" className="rux-input" type="text" required />
        </div> <br/>
        <div className="rux-form-field">
          <label htmlFor="input__password">Password</label>
          <input id="input__password" className="rux-input" type="password" required />
        </div> <br/>
        <rux-button type="button">
          Submit
        </rux-button>
      </form>

      <h6>Need an account? Sign up <a href="/signup">here</a>.</h6>
    </div>
  );
}

// switch case dependant on User_Type
// case "Developer", render developer view
// case "Project Manager", render PM view
// case "General Manager", render GM view
// default is logged out view, which displays text "Log in or sign Up to view Dashboard"