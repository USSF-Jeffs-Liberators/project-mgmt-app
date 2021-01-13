//CREATE A FORM FOR ASSIGNING PEOPLE TO THE PROJECT
import React from "react";
import { AvailableUsers } from "./AvailableUsers";

export const ProjTeam = ({ formData, userData, setForm, navigation }) => {
  const props = { navigation, formData, userData };
  const { projDeadline, projManager } = formData;
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
    <div>
      <div className="flex-container">
        <form
          id="form"
          className="flex-child"
          style={{
            maxWidth: "250px",
            minWidth: "225px",
            marginTop: "0px",
            marginRight: "64px",
          }}
        >
          <h1 style={{ marginTop: "26px" }}>Project Team</h1>
          <div className="rux-form-field" style={{ marginTop: "16px" }}>
            <label style={{ marginBottom: "6px" }} htmlFor="projManager">
              Project Manager
            </label>
            <select
              className="rux-form-element rux-select"
              name="projManager"
              id="projManager"
              value={projManager}
              onChange={setForm}
              autoComplete="off"
            >
              <option value="">Select Project Manager</option>
              {filterUsers("Project Manager").map((each) => (
                <option>{`${each.first_name} ${each.last_name}`}</option>
              ))}
            </select>
          </div>
          <div className="rux-button-group" style={{ marginTop: "175px" }}>
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
              onClick={() => {
                projManager != ""
                  ? navigation.next()
                  : alert("Please select a project manager.");
              }}
            >
              Next
            </button>
          </div>
        </form>
        <AvailableUsers {...props} filterUsers={filterUsers} />
      </div>
    </div>
  );
};
