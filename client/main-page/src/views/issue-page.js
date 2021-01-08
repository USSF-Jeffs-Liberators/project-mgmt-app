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
        // projectIDBox: "",
        // issueDescriptionBox: "",
        // priorityBox: ""
      }
    }

    // handleProjectIDBoxChange(event)
    // {
    //   this.setState({projectIDBox: event.target.value})
    //   console.log("inside handleChangeProjectIDBox");
    //   console.log(this.state.projectIDBox);
    // }

    // handleIssueDescriptionBoxChange(event)
    // {
    //   this.setState({issueDescriptionBox: event.target.value})
    //   console.log("inside handleChangeIssueDescriptionBox");
    //   console.log(this.state.issueDescriptionBox);
    // }

    // handlePriorityBoxChange(event)
    // {
    //   this.setState({priorityBox: event.target.value})
    //   console.log("inside handleChangePriorityBox");
    //   console.log(this.state.priorityBox);
    // }

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
          // onProjectIDBoxChange={this.handleProjectIDBoxChange.bind(this)}
          // onIssueDescriptionBoxChange={this.handleIssueDescriptionBoxChange.bind(this)}
          // onPriorityBoxChange={this.handlePriorityBoxChange.bind(this)}
          onSubmitIssue={this.handleSubmitIssue.bind(this)}
        />
        {/* <h4>Input the Project Id, a description of your issue, and the priority of the issue</h4>
  
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
        </form> */}
  
      </div>
    );
  }
}
  
export default SubmitIssue;