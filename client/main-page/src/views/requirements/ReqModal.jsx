import React from "react";
import "./Modal.css";

export const ReqModal = (props) => {

  return (
    <div
      className="modal-wrapper"
      style={{
        transform: props.showRequirementModal
          ? "translateY(0vh)"
          : "translateY(1000vh)",
        opacity: props.showRequirementModal ? "1" : 0,
        position: props.showRequirementModal ? "auto" : "fixed"
      }}
    >
      <div className="modal-header">
        <h2 align="center">{props.selectedRequirement === null ? ('Add') : ('Edit')} Requirement</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h3>Description</h3>
          <textarea id="req-desc"></textarea>
          <br></br><br></br>
          <h3>Priority</h3>
          <div class="select-type">
            <select id="priority-select" required>
              <option selected disabled>Choose an option</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <br></br><br></br>
          {props.selectedRequirement === null ? null :
          <h3>Status</h3>}
          {props.selectedRequirement === null ? null : (
          
          <div class="select-type">
            <select id="req-status" required>
              <option selected disabled>Choose an option</option>
              <option value="Completed">Completed</option>
              <option value="Started">Started</option>
              <option value="Not Started">Not Started</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          )}
        </div>
        <div className="modal-footer">
          <div className="button-div3">
            <button
              className="rux-button modal-button"
              onClick={() => {
                let reqDesc = document.getElementById("req-desc").value;
                let priority = document.getElementById("priority-select").value;
                let reqStatus;
                if(props.selectedRequirement !== null){
                  reqStatus = document.getElementById("req-status").value
                }
                
                if (props.verifyDescription(reqDesc) && props.verifyPriority(priority)) {
                  if (props.selectedRequirement === null) {
                    props.addRequirement(reqDesc, priority, props.currentProject);
                  } else {
                    props.editRequirement(reqDesc, priority, reqStatus, props.selectedRequirement.requirement_id);
                  }
                  props.closeRequirementModal();
                }
              }}
            >
              Submit
            </button>
            <button
              className="rux-button modal-button"
              onClick={() => {
                props.closeRequirementModal();
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
