import React, { useState, useEffect } from "react";
import { RuxAccordion } from "../rux-accordion";

export const ProjReview = ({ navigation, formData, ManagerFilter }) => {
  const {
    projName,
    projDesc,
    projBudget,
    projStart,
    projDeadline,
    projManager,
  } = formData;

  function formatTimestamp(timestamp) {
    return (
      timestamp.getFullYear() +
      "-" +
      this.ensureDoubleDigits(timestamp.getMonth() + 1) +
      "-" +
      this.ensureDoubleDigits(timestamp.getDate()) +
      " " +
      this.ensureDoubleDigits(timestamp.getHours()) +
      ":" +
      this.ensureDoubleDigits(timestamp.getMinutes()) +
      ":" +
      this.ensureDoubleDigits(timestamp.getSeconds())
    );
  }

  const handleSubmitNewProject = async () => {
    try {
      let data = {
        project_manager: projManager,
        project_name: projName,
        project_desc: projDesc,
        budget: projBudget,
        start_date: formatTimestamp(new Date(projStart)),
        deadline_date: formatTimestamp(new Date(projDeadline)),
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      await fetch(`http://localhost:3001/projects`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "failed") alert(response.message);
          else navigation.go("submit");
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className="flex-child"
      style={{
        marginRight: "10%",
        marginLeft: "10%",
        flex: "1",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginTop: "26px" }}>Review</h1>
      <RenderAccordion
        summary="Project Information"
        details={[
          { "Project Name": projName },
          { "Project Description": projDesc },
          { "Project Budget": projBudget },
        ]}
      />
      <RenderAccordion
        summary="Project Timeline"
        details={[
          { "Project Start": projStart },
          { "Project Deadline": projDeadline },
        ]}
      />
      <RenderAccordion
        summary="Project Team"
        details={[
          {
            "Project Manager": `${JSON.stringify(ManagerFilter())}`,
          },
        ]}
      />
      <rux-accordion>
        <span slot="label">JSON View</span>
        <div
          slot="content"
          style={{
            whiteSpace: "normal",
            alignSelf: "flex-start",
            width: "368px",
          }}
        >
          <pre>
            <code>{JSON.stringify(formData, null, 2)}</code>
          </pre>
        </div>
      </rux-accordion>
      <div className="rux-button-group">
        <button
          className="rux-button"
          type="button"
          style={{ marginTop: "1rem" }}
          onClick={() => navigation.go("project form")}
        >
          Back
        </button>
        <button
          className="rux-button"
          type="submit"
          value="Submit"
          style={{ marginTop: "1rem" }}
          onClick={handleSubmitNewProject}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export const RenderAccordion = ({ summary, details }) => (
  <rux-accordion>
    <span slot="label">{summary}</span>
    <div
      slot="content"
      style={{ whiteSpace: "normal", alignSelf: "flex-start", width: "368px" }}
    >
      <ul>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];
          return <li>{`${objKey}: ${objValue}`}</li>;
        })}
      </ul>
    </div>
  </rux-accordion>
);
