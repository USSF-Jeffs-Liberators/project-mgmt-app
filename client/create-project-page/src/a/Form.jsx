import React from "react";

function Form(props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Form;
