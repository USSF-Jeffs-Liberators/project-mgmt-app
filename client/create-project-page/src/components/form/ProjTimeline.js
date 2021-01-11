import React from "react";

export const ProjTimeline = ({ formData, setForm, navigation }) => {
  const { projStart, projDeadline } = formData;
  return (
    <div id="form">
      <form className="rux-form">
        <h1 style={{ marginTop: "26px" }}>Project Timeline</h1>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="projStart">
            Project Start
          </label>
          <input
            type="date"
            name="projStart"
            value={projStart}
            min="2020-01-01"
            max="2041-01-01"
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
          />
        </div>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="projDeadline">
            Project Deadline
          </label>
          <input
            type="date"
            name="projDeadline"
            value={projDeadline}
            min="2020-01-01"
            max="2041-01-01"
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
          />
        </div>
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
