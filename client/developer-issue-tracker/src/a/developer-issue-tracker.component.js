import React from "react";
import DisplayDeveloperIssueTracker from './DisplayDeveloperIssueTracker'

const port = 'http://localhost:3001'

class DeveloperIssueTracker extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      userType: "developer",

    };
  }
  

  handleDisplayDeveloperIssueTracker = async () =>
  {
    // let user = "1";
    
    // const response = await fetch(`${port}/users/1`)
    // const json = await response.json();

    // console.log("MADE IT")
    // console.log(json);

    try {
      const response = await fetch(`http://localhost:3001/users/1`);
      const jsonData = await response.json();
      console.log(jsonData);
       } 
    catch (err) {
      console.error(err.message);
       }
  }

  render()
  {
    return (
      <div>
        <header>
          <h1> This is developer-issue-tracker </h1>
        </header>

        <DisplayDeveloperIssueTracker
          onDisplayDeveloperIssueTracker = {this.handleDisplayDeveloperIssueTracker}
        />

      </div>
    );
    }
  }


  export default DeveloperIssueTracker;