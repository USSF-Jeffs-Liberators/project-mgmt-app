import React, { useState, useEffect } from "react";
import { RuxAccordion } from "../rux-accordion";

export const ProjReview = ({ navigation, formData }) => {

  useEffect(() => {
    const fetchManagerData = async () => {
      projManager !== ""
        ? setManager(JSON.parse(projManager))
        : setManager(JSON.parse('{"first_name": "", "last_name": ""}'));
    };
    fetchManagerData();
  }, [projManager]);

  const [manager, setManager] = useState([]);
  
  const {
    projName,
    projDesc,
    projBudget,
    projStart,
    projDeadline,
    projManager,
  } = formData;

  return (
    <div className="flex-child" style={{ marginRight: "10%", marginLeft: "10%", flex: "1", flexDirection: "column" }}>
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
            "Project Manager": `${manager.first_name}${
              "user_id" in manager ? " " : ""
            }${manager.last_name}`,
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
          onClick={() => navigation.go("submit")}
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
