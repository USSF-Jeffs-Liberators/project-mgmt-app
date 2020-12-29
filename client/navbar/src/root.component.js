import React from "react";
import { createBrowserHistory } from 'history';
import { links } from "./links.js";

const history = createBrowserHistory();

export default function Root(props) {
  const buttonMargin = {margin: "2px"} 

  return (
    <rux-global-status-bar className="dark-theme">
      <h2 onClick={() => history.push("/")}>Project Management App</h2>
      <rux-tabs small id="navigation-tabs">
        {links.developer.map((link) => {
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
        {links.loggedOut.map((link) => {
            return (
              <rux-button 
                key={link.href} 
                onClick={() => history.push("/" + link.href)}
                style={buttonMargin}>
                {link.name}
              </rux-button>
            );
          })
        }
      </rux-button-group>
    </rux-global-status-bar>
  )
}

// dashboard tabs:
// logged in User_Type -> switch case
// case "Developer", map developer links into tabs
// case "Project Manager", map projectManager links into tabs
// case "General Manager", map generalManager links into tabs
// default does not display any links or tabs

// login/signup/logout buttons:
// if logged out, map loggedOut links
// else if logged in, render "Log Out" button
