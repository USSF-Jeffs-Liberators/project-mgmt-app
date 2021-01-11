import React from "react";
import { RuxAccordion } from "../../altcomponents/components/Accordion/rux-accordion";

export const AvailableUsers = ({ navigation, userData, formData }) => {
  const { go } = navigation;
  const { projStart, projDeadline } = formData;
  var formStartDate = new Date(projStart);
  var formDeadlineDate = new Date(projDeadline);

  function filterUsers(role) {
    const roleFiltered = userData.hits.filter((each) => each.name === role);
    const dateFiltered = roleFiltered.filter((each) => {
      var dataDeadline = new Date(each.deadline_date);
      var dataEnd =
        each.end_date != null // if the end date is not null
          ? new Date(each.end_date) // set dataEnd to a new date using end_date
          : new Date("2010-01-01"); // if end date IS null, set dataEnd to an arbitrary date that is before the current date
      var dataStart = new Date(each.start_date);
      return (
        (dataDeadline < Date.now() &&
          (each.end_date === null || dataEnd < Date.now())) || // if the user's listed projects ended before today // OR
        dataStart > formDeadlineDate // the user's listed projects do not start until after the new project's deadline...
      ); //the user will be visible for availability
    });
    return dateFiltered;
  }

  return (
    <div>
      <h1>Available Team Members</h1>
      <RenderAccordion
        summary="Project Managers"
        availUsers={filterUsers("Project Manager")}
      />
      <RenderAccordion
        summary="Developers"
        availUsers={filterUsers("Developer")}
      />
      <button
        className="rux-button"
        type="button"
        style={{ marginTop: "1rem" }}
        onClick={() => go("submit")}
      >
        Submit
      </button>
    </div>
  );
};

function parseDate(d) {
  if (d != null) {
    var date = new Date(d);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  } else return null;
}

export const RenderAccordion = ({ summary, availUsers }) => (
  <rux-accordion>
    <span slot="label">{summary}</span>
    <span slot="content">
      <table className="rux-table">
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Project Name</th>
            <th>Project Start Date</th>
            <th>Project Deadline</th>
          </tr>
          {availUsers.map((each) => (
            <tr key={each.user_id}>
              <td>{each.first_name}</td>
              <td>{each.last_name}</td>
              <td>{each.project_name}</td>
              <td>{parseDate(each.start_date)}</td>
              <td>{parseDate(each.deadline_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </span>
  </rux-accordion>
);
