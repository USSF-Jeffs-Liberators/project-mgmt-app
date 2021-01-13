import React from "react";

export const ProjInfo = ({ formData, setForm, navigation, userData }) => {
  const { projName, projDesc, projBudget } = formData;

  return (
    <div id="form">
      <form>
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
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="projBudget">
            Project Budget
          </label>
          <input
            type="number"
            step="0.01" 
            min="0"
            className="rux-form-element"
            placeholder="0.00"
            id="projBudget"
            name="projBudget"
            value={projBudget}
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
            required
          />
        </div>
        <div className="rux-button-group">
          <button
            className="rux-button"
            type="button"
            style={{ marginTop: "1rem" }}
            onClick={() => projName != "" && projDesc != "" && projBudget != "" ? (projBudget.indexOf(".") != -1 && projBudget.indexOf(".") - projBudget.length === -3 ) ? navigation.next() : alert("The budget must have a cent value, like so: 0.00.") : alert("Please fill out all fields.")}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
