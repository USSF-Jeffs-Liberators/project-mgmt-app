import React from "react";

export const Names = ({ formData, setForm, navigation }) => {
  const { firstName, lastName, nickName } = formData;
  return (
    <div id="form">
      <form className="rux-form">
        <h1 style={{ marginTop: "26px" }}>Names</h1>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            className="rux-form-element"
            placeholder="John"
            name="firstName"
            value={firstName}
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
          />
        </div>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            className="rux-form-element"
            placeholder="Doe"
            name="lastName"
            value={lastName}
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
          />
        </div>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="nickName">
            Nick Name
          </label>
          <input
            type="text"
            className="rux-form-element"
            placeholder="Jonny"
            name="nickName"
            value={nickName}
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
