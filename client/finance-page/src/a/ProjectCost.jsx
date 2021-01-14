import React from "react";

function ProjectCost(props) {
  return (
    <div>
      <div class="progress-div">
        <div class="wrapper">
          <div
            class="container chart"
            data-size="350"
            data-value={props.progress}
            data-arrow="d"
          ></div>
        </div>
      </div>
      <h1 className="current-progress">
        {" "}
        {props.getDollarFigure(props.selectedProject.current_cost)} (Costs) /{" "}
        {props.getDollarFigure(props.selectedProject.budget)} (Budget)
      </h1>

      <div class="table-wrapper">
        {/* EXPENSES */}
        <h1 className="financePage">Expenses</h1>
        <table class="rux-table">
          <tr class="rux-table__column-head">
            <th colspan="2">Description</th>
            <th>Type</th>
            <th>Amount</th>
            {props.userType === 'Project Manager' ? (<th colspan="2">Options</th>) : (null)}
          </tr>
          {props.selectedProjectExpenses.map((expense) => (
            <tr>
              {expense.expense_type === "Labor" ? (
                <td colspan="1"><font color="#A9A9A9">{props.getExpenseDescription(expense)}</font></td>
              ) : (
                <td colspan="2">{props.getExpenseDescription(expense)}</td>
              )}
              {expense.expense_type === "Labor" ? (
                <td><font color="#A9A9A9">{props.getPayRate(expense)}</font></td>
              ) : null}
              <td><font color={expense.expense_type === "Labor" ? ("#A9A9A9") : ("FFFFFF")}>{expense.expense_type}</font></td>
              <td><font color={expense.expense_type === "Labor" ? ("#A9A9A9") : ("FFFFFF")}>{props.getDollarFigure(expense.expense_amount)}</font></td>
              {props.userType === 'Project Manager' ? (expense.expense_type !== "Labor" ? (
                <td>
                  <button
                    className="rux-button"
                    onClick={() => {
                      props.openExpenseModal(expense);
                    }}
                  >
                    Edit
                  </button>
                </td>
              ) : (
                <td></td>
              )) : (null)}
              {props.userType === 'Project Manager' ? (expense.expense_type !== "Labor" ? (
                <td>
                  <button
                    className="rux-button"
                    onClick={() => {
                      props.deleteExpense(expense);
                    }}
                  >
                    Delete
                  </button>
                </td>
              ) : (
                <td></td>
              )) : (null)}
            </tr>
          ))}
          {props.userType === 'Project Manager' ? (
            <tr class="rux-table__column-head">
              <th colspan="6" className="button-section">
                <div className="button-div1">
                  <button
                    className="rux-button"
                    onClick={() => {
                      props.openExpenseModal(null);
                    }}
                  >
                    Add Expense
                  </button>
                </div>
              </th>
            </tr>) : (null)
          }
        </table>
        <br></br>
        <br></br>

        {/* FUNDING REQUESTS */}
        <h1 className="financePage">Funding Requests</h1>
        <table class="rux-table">
          <tr class="rux-table__column-head">
            <th>Submitted By</th>
            <th>Submit Date</th>
            <th>Request Amount</th>
            <th>Justification</th>
            <th>Suspense Date</th>
            <th>Review Date</th>
            <th>Review Status</th>
            <th>Review Note</th>
            <th>Reviewed By</th>
            {props.hasPendingFundingRequest(props.projectFundingRequests) ? (
              props.userType === 'Project Manager' ? (<th colspan="2">Options</th>) : (<th>Options</th>)
            ) : (null)}
          </tr>
          {props.projectFundingRequests.map((request) => (
            <tr>
              <td>{props.getFullName(request.initiator)}</td>
              <td>{props.parseDatabaseDate(request.submit_date)}</td>
              <td>{props.getDollarFigure(request.request_amount)}</td>
              <td class="td-textarea">{request.justification}</td>
              <td>{props.parseDatabaseDate(request.suspense_date)}</td>
              <td>{props.parseDatabaseDate(request.review_date)}</td>
              <td>
                <font color={props.getStatusColor(request.review_status)}>
                  {request.review_status}
                </font>
              </td>
              <td class="td-textarea">
                {request.review_note !== null ? request.review_note : "N/A"}
              </td>
              <td>{props.getFullName(request.reviewed_by)}</td>
              {props.hasPendingFundingRequest(props.projectFundingRequests) ? (
                request.review_status === 'Pending Review' ? (
                  props.userType === 'Project Manager' ? (
                    <td><button className="rux-button" onClick={() => {
                      props.openFundingRequestModal(request);
                    }}>Edit</button></td>) : 
                  (
                    <td><button className="rux-button" onClick={() => {
                      props.openReviewModal(request)
                    }}>Review</button></td>
                  )
                ) : (<td></td>)
              ) : (null)}
              {props.hasPendingFundingRequest(props.projectFundingRequests) ? (
                props.userType === 'Project Manager' ? (
                  request.review_status === 'Pending Review' ? (
                    <td><button className="rux-button" onClick={() => {
                      props.deleteFundingRequest(request)
                    }}>Delete</button></td>
                  ) : (<td></td>)
                ) : (null)
              ) : (null)}
            </tr>
          ))}
          {props.userType === 'Project Manager' ? (
            <tr class="rux-table__column-head">
              <th colspan={props.hasPendingFundingRequest(props.projectFundingRequests) ? ("11") : ("9")} className="button-section">
                <div className="button-div2">
                  <button
                    className="rux-button"
                    onClick={() => {
                      props.openFundingRequestModal(null);
                    }}
                  >
                    Create Funding Request
                  </button>
                </div>
              </th>
            </tr>) : (null)
          }
        </table>
      </div>
      <br></br>

      {!props.isProgressBarDisplayed
        ? setTimeout(() => {
            let progress = Math.round(
              (props.selectedProject.current_cost /
                props.selectedProject.budget) *
                100
            );
            props.setProgressValue(progress);
            props.setCircleProgress();
          }, 500)
        : null}
    </div>
  );
}

export default ProjectCost;
