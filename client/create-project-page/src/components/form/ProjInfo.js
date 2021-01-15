import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

export const ProjInfo = ({ formData, setForm, navigation, UserFilter }) => {
  const {
    projName,
    projDesc,
    projBudget,
    projStart,
    projDeadline,
    projManager,
  } = formData;

  const name = (value) => {
    if (typeof value !== "string") {
      return (
        <div className="alert altert-danger" role="alert">
          This field must be a string.
        </div>
      );
    } else if (value.length > 255) {
      return (
        <div className="alert altert-danger" role="alert">
          This field must be 255 characters or less.
        </div>
      );
    }
  };

  const currency = (value) => {
    if (value.indexOf(".") === -1 || value.indexOf(".") - value.length !== -3) {
      return (
        <div className="alert altert-danger" role="alert">
          This field must go to the hundreths decimal place.
        </div>
      );
    }
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const date = (value) => {
    if (projStart > projDeadline) {
      return (
        <div className="alert alert-danger" role="alert">
          The deadline must be after the start date.
        </div>
      );
    }
  };

  const pmgr = (value) => {
    if (typeof value !== "string") {
      return (
        <div className="alert altert-danger" role="alert">
          This field must be a string.
        </div>
      );
    } else if (!JSON.parse(value).user_id) {
      return (
        <div className="alert alert-danger" role="alert">
          The selected project manager doesn't have a valid user id.
        </div>
      );
    }
  };

  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReview = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setLoading(false);
      navigation.go("review");
    } else {
      setLoading(false);
    }
  };

  return (
    <Form className="flex-child" ref={form} style={{ marginRight: "5em" }}>
      <h1 style={{ marginTop: "26px" }}>Project Information</h1>
      <div className="rux-form-field" style={{ marginTop: "20px" }}>
        <label htmlFor="projName">Project Name</label>
        <Input
          type="text"
          placeholder="Example Application"
          id="projName"
          name="projName"
          value={projName}
          onChange={setForm}
          autoComplete="off"
          validations={[required, name]}
        />
      </div>
      <div className="rux-form-field" style={{ marginTop: "20px" }}>
        <label htmlFor="projDesc">Project Description</label>
        <Textarea
          type="textarea"
          placeholder="Describe the purpose of the project."
          id="projDesc"
          name="projDesc"
          value={projDesc}
          onChange={setForm}
          autoComplete="off"
          validations={[required]}
        />
      </div>
      <div className="rux-form-field" style={{ marginTop: "20px" }}>
        <label htmlFor="projBudget">Project Budget</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          id="projBudget"
          name="projBudget"
          value={projBudget}
          onChange={setForm}
          autoComplete="off"
          validations={[required, currency]}
        />
      </div>
      <div className="rux-form-field" style={{ marginTop: "20px" }}>
        <label htmlFor="projStart">Project Start</label>
        <Input
          type="date"
          id="projStart"
          name="projStart"
          value={projStart}
          min="2020-01-01"
          max="2041-01-01"
          onChange={setForm}
          validations={[required, date]}
        />
      </div>
      <div className="rux-form-field" style={{ marginTop: "20px" }}>
        <label htmlFor="projDeadline">Project Deadline</label>
        <Input
          type="date"
          id="projDeadline"
          name="projDeadline"
          value={projDeadline}
          min="2020-01-01"
          max="2041-01-01"
          onChange={setForm}
          validations={[required, date]}
        />
      </div>
      <div className="rux-form-field" style={{ marginTop: "20px" }}>
        <label htmlFor="projManager">Project Manager</label>
        <div class="select-type">
          <select
            name="projManager"
            id="projManager"
            value={projManager}
            onChange={setForm}
            autoComplete="off"
            validations={[required, pmgr]}
          >
            <option value="">Select Project Manager</option>
            {UserFilter("Project Manager").map((each) => (
              <option
                value={(each.user_id)}
              >{`${each.first_name} ${each.last_name}`}</option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="rux-button-group"
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          margin: "0rem",
        }}
      >
        <button
          className="rux-button"
          type="button"
          disabled={loading}
          style={{ marginTop: "1.5rem" }}
          onClick={handleReview}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Review</span>
        </button>
      </div>
      {message && (
        <div className="rux-form">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
};
