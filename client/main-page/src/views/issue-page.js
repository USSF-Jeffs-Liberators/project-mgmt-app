import React from "react";
import { createBrowserHistory } from "history";
import { AddIssueComponent } from './Issue-Tracker/AddIssue-component';

const history = createBrowserHistory();

const user_id = 1

class SubmitIssue extends React.Component{
    constructor(props)
    {
      super(props)

      this.state = {
      }
    }

    //Submit issue function
    async handleSubmitIssue(projectID, issueDesc, priority)
    {
      console.log(projectID)
      console.log(issueDesc)
      console.log(priority)

      const todayDate = new Date();

      const settings = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              project_id: projectID,
              author: user_id,
              issue_desc: issueDesc,
              severity: priority,
              issue_timestamp: todayDate.toLocaleString(),
              is_resolved: false,
              resolve_date: null,
              resolution: null
          })
      };
      try 
      {
          const response = await fetch(`http://localhost:3001/issues`, settings);
          const json = await fetchResponse.json();
      }
      catch(err)
      {
          console.error(err.message);
      }
    }


    render()
    {
    return (
      <div id="loginpage">
        <AddIssueComponent
          onSubmitIssue={this.handleSubmitIssue.bind(this)}
        />
      </div>
    );
  }
}
  
export default SubmitIssue;