import React from "react";

function Form(props) {
  let header = "";
  if (props.username) {
    header = <h1> Hello {props.username}</h1>;
  } else {
    header = "";
  }

  return (
    <div>
      <form id="form" className="rux-form" onSubmit={props.onSubmit}>
        {header}
        <div className="rux-form-field">
          <label className="rux-form-field__label" htmlFor="input_text">
            Text Input Label
          </label>
          <input
            type="text"
            name="input_text_field"
            required
            placeholder="Text Input"
            onChange={props.onChange}
          />
        </div>
        <br />
        <button
          className="rux-button"
          type="submit"
          size="small"
          value="Submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
