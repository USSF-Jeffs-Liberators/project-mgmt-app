//CREATE A FORM FOR ASSIGNING PEOPLE TO THE PROJECT
import React from "react";
import { AvailableUsers } from "./AvailableUsers";

export const ProjTeam = ({ formData, userData, setForm, navigation }) => {
  const { projStart, projDeadline } = formData;
  const props = { navigation, userData, formData };

  return (
    <div className="flex-container">
        <AvailableUsers {...props}/>
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
