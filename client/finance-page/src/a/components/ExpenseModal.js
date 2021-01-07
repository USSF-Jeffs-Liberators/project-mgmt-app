import React from "react";
import "./Modal.css";

export const ExpenseModal = (props) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: props.showExpenseModal
          ? "translateY(0vh)"
          : "translateY(-100vh)",
        opacity: props.showExpenseModal ? "1" : 0,
      }}
    >
      <div className="modal-header">
        <h2 align="center">Add Expense</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h3>Description</h3>
          <textarea id="expense-desc"></textarea>
          <h3>Type</h3>
          <select id="expense-type" required>
            <option value="" disabled selected></option>
            <option value="Service">Service</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other</option>
          </select>
          <h3>Amount</h3>
          <span class="currencyinput">
            $<input type="text" id="expense-amount"></input>
          </span>
        </div>
        <div className="modal-footer">
          <rux-button
            onClick={() => {
              let expenseDesc = document.getElementById("expense-desc").value;
              let expenseType = document.getElementById("expense-type").value;
              let expenseAmount = document.getElementById("expense-amount")
                .value;
              if (props.selectedExpense === null) {
                props.addExpense(expenseDesc, expenseType, expenseAmount);
              } else {
                props.updateExpense(expenseDesc, expenseType, expenseAmount);
              }
              props.closeExpenseModal();
            }}
          >
            Submit
          </rux-button>
          <rux-button
            align="right"
            onClick={() => {
              props.closeExpenseModal();
            }}
          >
            Cancel
          </rux-button>
        </div>
      </div>
    </div>
  );
};
