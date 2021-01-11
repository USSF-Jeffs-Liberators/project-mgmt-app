import React from "react";
import "./Modal.css";

export const ReviewModal = (props) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: props.showReviewModal
          ? "translateY(0vh)"
          : "translateY(-100vh)",
        opacity: props.showReviewModal ? "1" : 0,
      }}
    >
      <div className="modal-header">
        <h2 align="center">Review Funding Request</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h3 id="review-submitted-by"></h3>
          <br></br><br></br>
          <h3 id="review-submit-date"></h3>
          <br></br><br></br>
          <h3 id="review-amount"></h3>
          <br></br><br></br>
          <h3>Justification</h3>
          <textarea id="review-justification" readOnly></textarea>
          <br></br><br></br>
          <h3 id="review-suspense-date"></h3>
          <br></br><br></br>
          <h3>Review Note</h3>
          <textarea id="review-note"></textarea>
        </div>
        <div className="modal-footer">
          <div className="button-div3">
            <button className="rux-button modal-button"
              onClick={() => {
                let reviewNote = document.getElementById("review-note").value;
                props.reviewFundingRequest(reviewNote, 'Approved')
                props.closeReviewModal()
              }}
            >
              Approve
            </button>
            <button className="rux-button modal-button" onClick={() => {
              let reviewNote = document.getElementById("review-note").value;
              props.reviewFundingRequest(reviewNote, 'Denied')
              props.closeReviewModal()
            }}>
              Deny
            </button>
            <button
              className="rux-button modal-button"
              onClick={() => {
                props.closeReviewModal();
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
