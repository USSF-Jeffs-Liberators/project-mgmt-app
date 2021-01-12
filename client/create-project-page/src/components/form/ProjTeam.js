//CREATE A FORM FOR ASSIGNING PEOPLE TO THE PROJECT
import React from "react";
import { AvailableUsers } from "./AvailableUsers";

export const ProjTeam = ({ formData, userData, setForm, navigation }) => {
  const props = { navigation, formData, userData };
  const { projDeadline } = formData;
  var formDeadlineDate = new Date(projDeadline);

  function filterUsers(role) {
    const roleFiltered = userData.filter((each) => each.name === role);
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
    <div className="flex-container">
        <AvailableUsers {...props} filterUsers={filterUsers}/>
      <form className="rux-form flex-child" style={{ minWidth: "225px" }}>
        <h1 style={{ marginTop: "26px" }}>Project Team</h1>
        <div className="rux-button-group">
          <button
            className="rux-button"
            type="button"
            style={{ marginTop: "1rem" }}
            onClick={() => navigation.previous()}
          >
            Back
          </button>
          <button
            className="rux-button"
            type="button"
            style={{ marginTop: "1rem" }}
            onClick={() => navigation.next()}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
