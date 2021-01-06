import React from "react";

function Form(props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div className="rux-form-field">
          <label htmlFor="input_text">Text Input Label</label>
          <input id="input__text" class="rux-input" type="text" required placeholder="Text Input"/>
        </div>
        <rux-button size="small"></rux-button>
      </form>
    </div>
  );
}

export default Form;
