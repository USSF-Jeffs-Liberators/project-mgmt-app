import React from "react";
import "./Modal.css";

export const IssueModal = (props) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: props.showIssueModal
          ? "translateY(0vh)"
          : "translateY(-1000vh)",
        opacity: props.showIssueModal ? "1" : 0,
      }}
    >
      <div className="modal-header">
        <h2 align="center">Add Issue</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
            <h3>Description</h3>
            <textarea id="issue-desc"></textarea>
            <br></br><br></br>
            <h3>Severity</h3>
            <div class="select-type">
                <select id="issue-severity">
                    <option selected disabled>Choose an option</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>  
        </div>
        
        <div className="modal-footer">
          <div className="button-div3">
            <button className="rux-button modal-button"
              onClick={() => {
                let issueDesc = document.getElementById("issue-desc").value
                let issueSeverity = document.getElementById("issue-severity").value
                props.addIssue(issueDesc, issueSeverity)
                props.closeIssueModal()
              }}
            >
              Submit
            </button>
            <button
              className="rux-button modal-button"
              onClick={() => {
                props.closeIssueModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
