import React from "react";

export const ProjBudget = ({ navigation }) => {
  return (
    <div id="form">
      <h1>Some financial form here.</h1>
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
    </div>
  );
};
