import React from "react";

export const Submit = ({ formData }) => {
  return (
    <div>
      <h3 style={{ margin: "4rem" }}>
        Thank you for submitting, we will be in touch!
      </h3>
      <pre><code>{JSON.stringify(formData, null, 2)}</code></pre>
    </div>
  );
};
