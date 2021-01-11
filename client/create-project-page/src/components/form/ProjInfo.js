import React from "react";

export const ProjInfo = ({ formData, setForm, navigation }) => {
  const { projName, projDesc } = formData;
  return (
    <div id="form">
      <form className="rux-form">
        <h1 style={{ marginTop: "26px" }}>Project Information</h1>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="projName">
            Project Name
          </label>
          <input
            type="text"
            className="rux-form-element"
            placeholder="Example Application"
            name="projName"
            value={projName}
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
          />
        </div>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="projDesc">
            Project Description
          </label>
          <textarea
            type="text"
            className="rux-input"
            placeholder="Describe the purpose of the project."
            name="projDesc"
            value={projDesc}
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
            onClick={() => navigation.next()}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
