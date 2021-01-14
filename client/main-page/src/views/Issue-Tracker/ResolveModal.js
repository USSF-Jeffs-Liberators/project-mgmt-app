import React from "react";
import "./Modal.css";

export const ResolveModal = (props) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: props.showResolveModal
          ? "translateY(0vh)"
          : "translateY(-100vh)",
        opacity: props.showResolveModal ? "1" : 0,
      }}
    >
      <div className="modal-header">
        <h2 align="center">Resolve Issue</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
            <h3>Resolution</h3>
            <textarea id="issue-resolution"></textarea>
        </div>
        
        <div className="modal-footer">
          <div className="button-div3">
            <button className="rux-button modal-button"
              onClick={() => {
                let issueResolution = document.getElementById("issue-resolution").value
                props.resolveIssue(issueResolution)
                props.closeResolveModal()
              }}
            >
              Submit
            </button>
            <button
              className="rux-button modal-button"
              onClick={() => {
                props.closeResolveModal();
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
