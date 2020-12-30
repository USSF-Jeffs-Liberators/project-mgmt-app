import React, { useEffect, useState } from "react";
import { createBrowserHistory } from 'history';
import { links } from "./links.js";

const history = createBrowserHistory();
const buttonMargin = {margin: "2px"};

export default function Root(props) {

  // mock user is logged in/out
  let loggedIn = false;
  let buttonLinks = [];

  // show login/signup buttons if logged out; otherwise enable log out if logged in
  loggedIn ? 
  buttonLinks = links.loggedIn :
  buttonLinks = links.loggedOut

  // mock different User_Types
  let userType = "Project Manager";
  let tabLinks = [];

  // tabs vary depending on the type of user logged in
  switch (userType) {
    case "Developer":
      tabLinks = links.developer;
      break;
    case "Project Manager":
      tabLinks = links.projectManager;
      break;
    case "General Manager":
      tabLinks = links.generalManager;
      break;
    default:
      tabLinks = [];
  }

  return (
    <rux-global-status-bar className="dark-theme">
      <h2 onClick={() => history.push("/")}>Project Management App</h2>
      <rux-tabs small id="navigation-tabs">
        {tabLinks.map((link) => {
          return (
            <rux-tab 
              key={link.href}
              onClick={() => history.push("/" + link.href)}>
                {link.name}
            </rux-tab>
          );
        })
        }
      </rux-tabs>
      <rux-button-group>
        {buttonLinks.map((link) => {
          return (
            <rux-button 
              key={link.href} 
              style={buttonMargin} 
              onClick={() => history.push("/" + link.href)}>
                {link.name}
            </rux-button>
          );
        })}
      </rux-button-group>
    </rux-global-status-bar>
  )
}