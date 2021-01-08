import React from "react";

export const AddIssueComponent = (props) =>
{
    return(
        <div>
            <h4>Input the Project Id, a description of your issue, and the priority of the issue</h4>
    
            <form className="rux-form">
            <div className="rux-form-field">
                <label htmlFor="input__text">Project Id</label>
                <input id="projectID" className="rux-input" type="number" required />
            </div>{" "}
            <br />
            <div className="rux-form-field">
                <label htmlFor="issueDesc">Issue Description</label>
                <input id="issueDesc" className="rux-input" type="text" required />
            </div>{" "}
            <br />
            <div className="rux-form-field">
                <label htmlFor="input__text">Priority</label>
                <select id="priority" className="rux-input" type="text" required>
                <option value = "low">Low</option>
                <option value = "medium">Medium</option>
                <option value = "high">High</option>
                </select>
            </div>{" "}
            <br />
            <rux-button type="button" onClick=
            {() => {
                let projectID = document.getElementById("projectID").value
                let issueDesc = document.getElementById("issueDesc").value
                let priority = document.getElementById("priority").value
                props.onSubmitIssue(projectID, issueDesc, priority)}}
            

            >Submit Issue</rux-button>
            </form>
        </div>
    )
};
