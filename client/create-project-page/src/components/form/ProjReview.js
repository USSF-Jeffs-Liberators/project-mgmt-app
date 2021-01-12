import React from "react";

export const ProjReview = ({ navigation, formData }) => {
  return (
    <div id="form">
      <h1>
        Summary of all form data entered to this point, with options to go back
        and make changes.
      </h1>
      <pre><code>{JSON.stringify(formData, null, 2)}</code></pre>
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
          value="Submit"
          style={{ marginTop: "1rem" }}
          onClick={() => navigation.next()}
        >
          Next
        </button>
      </div>
    </div>
  );
};
