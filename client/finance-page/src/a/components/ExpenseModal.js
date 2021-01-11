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
        <h2 align="center">{props.selectedExpense === null ? ('Add') : ('Edit')} Expense</h2>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h3>Description</h3>
          <textarea id="expense-desc"></textarea>
          <br></br><br></br>
          <h3>Type</h3>
          <div class="select-type">
            <select id="expense-type" required>
              <option selected disabled>Choose an option</option>
              <option value="Service">Service</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <br></br><br></br>
          <h3>Amount</h3>
          <span class="currencyinput">
            $<input type="text" class="amount-text" id="expense-amount"></input>
          </span>
        </div>
        <div className="modal-footer">
          <div className="button-div3">
            <button
              className="rux-button modal-button"
              onClick={() => {
                let expenseDesc = document.getElementById("expense-desc").value;
                let expenseType = document.getElementById("expense-type").value;
                let expenseAmount = props.formatAmount(document.getElementById("expense-amount").value)
                if (props.verifyDescription(expenseDesc) && props.verifyType(expenseType) && props.verifyAmount(expenseAmount)) {
                  if (props.selectedExpense === null) {
                    props.addExpense(expenseDesc, expenseType, expenseAmount);
                  } else {
                    props.editExpense(expenseDesc, expenseType, expenseAmount);
                  }
                  props.closeExpenseModal();
                }
              }}
            >
              Submit
            </button>
            <button
              className="rux-button modal-button"
              onClick={() => {
                props.closeExpenseModal();
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
