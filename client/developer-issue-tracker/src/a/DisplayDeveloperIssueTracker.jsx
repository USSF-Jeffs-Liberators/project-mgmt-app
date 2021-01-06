import React from "react";

function DisplayDeveloperIssueTracker(props) {
  return (
    <div>
      <button onClick={props.onDisplayDeveloperIssueTracker}>
        Show all Issues
      </button>
    </div>
  );
}

export default DisplayDeveloperIssueTracker;
