import React from "react";

export const ProjSubmit = ({ navigation }) => {
  return (
    <div className="form">
      <h1>
        On submission of the form, all data is sent to the db to create new
        entries in the relevant tables.
      </h1>
      <div className="rux-button-group">
        <button
          className="rux-button"
          type="button"
          style={{ marginTop: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </button>
      </div>
    </div>
  );
};
