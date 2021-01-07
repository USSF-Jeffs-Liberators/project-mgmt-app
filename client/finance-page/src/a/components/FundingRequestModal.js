import React from "react";
import "./Modal.css";

export const FundingRequestModal = (props) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: props.showFundingRequestModal
          ? "translateY(0vh)"
          : "translateY(-100vh)",
        opacity: props.showFundingRequestModal ? "1" : 0,
      }}
    >
      <div className="modal-header">
        <h2 align="center">Create Funding Request</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h3>Justification</h3>
          <textarea id="justification"></textarea>
          <br></br><br></br>
          <h3>Suspense Date</h3>
          <input type="date" id="suspense-date" name="suspense-date"></input>
          <br></br><br></br>
          <h3>Amount</h3>
          <span class="currencyinput">
            $<input type="text" id="amount"></input>
          </span>
        </div>
        <div className="modal-footer">
          <div className="button-div3">
            <button className="rux-button modal-button"
              onClick={() => {
                let amount = document.getElementById("amount").value;
                let justification = document.getElementById("justification")
                  .value;
                let suspenseDate = document.getElementById("suspense-date")
                  .value;
                props.submitFundingRequest(amount, justification, suspenseDate);
                props.closeFundingRequestModal();
              }}
            >
              Submit
            </button>
            <button
              className="rux-button modal-button"
              onClick={() => {
                props.closeFundingRequestModal();
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
