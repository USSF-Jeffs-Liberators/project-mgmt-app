import React, { useEffect, useState } from "react";
import { createBrowserHistory } from 'history';
import { links } from "./links.js";

const history = createBrowserHistory();

export default function Root(props) {
  // mock logged in/out and user type
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setCurrentUser(user);
      setLoggedIn(true);
    }
  }, []);
  
  let buttonLinks = [];
  let tabLinks = [];

  // show login/signup buttons if logged out; otherwise enable log out if logged in
  loggedIn ? 
  buttonLinks = links.loggedIn :
  buttonLinks = links.loggedOut

  // tabs vary depending on the type of user logged in
  if(currentUser){
    switch (currentUser.roles[0]) {
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
  } else {
    tabLinks = [];
  }
  

  return (
    <rux-global-status-bar className="dark-theme">
      <h2 id="navbarLogo" onClick={() => history.push("/")}><img src="/static/img/ussf-logo.png" alt="US Space Force logo"></img>Supra Project Management Platform</h2>
      <rux-tabs small id="navigation-tabs">
        {tabLinks.map((link) => {
          return (
            <rux-tab 
              key={link.href}
              className={link.class} 
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
              className={link.class}
              onClick={() => {
                  if(link.href === "logout"){
                    localStorage.removeItem("user")
                    setCurrentUser(undefined)
                    setLoggedIn(false);
                  }
                  history.push("/" + link.href)
                              }}>
                {link.name}
            </rux-button>
          );
        })}
      </rux-button-group>
    </rux-global-status-bar>
  )
}