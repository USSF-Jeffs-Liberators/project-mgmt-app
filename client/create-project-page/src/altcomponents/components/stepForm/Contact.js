import React from "react";

export const Contact = ({ formData, setForm, navigation }) => {
  const { phone, email } = formData;
  return (
    <div id="form">
      <form className="rux-form">
        <h1 style={{ marginTop: "26px" }}>Contact</h1>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            className="rux-form-element"
            placeholder="(999) 999-9999"
            name="phone"
            value={phone}
            onChange={setForm}
            autoComplete="off"
            style={{ marginTop: "6px" }}
          />
        </div>
        <div className="rux-form-field" style={{ marginTop: "16px" }}>
          <label className="rux-form-element label" htmlFor="email">
            E-Mail
          </label>
          <input
            type="text"
            className="rux-form-element"
            placeholder="user@domain.com"
            name="email"
            value={email}
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
