import React from "react";
import { RuxAccordion } from "../../altcomponents/components/Accordion/rux-accordion";

export const ProjReview = ({ navigation, formData }) => {
  const { go } = navigation;
  const {
    projName,
    projDesc,
    projBudget,
    projStart,
    projDeadline,
    projManager,
  } = formData;

  return (
    <div id="form">
      <h1 style={{ marginTop: "26px" }}>Review</h1>
      <RenderAccordion
        summary="Project Information"
        go={go}
        details={[
          { "Project Name": projName },
          { "Project Description": projDesc },
          { "Project Budget": projBudget },
        ]}
      />
      <RenderAccordion
        summary="Project Timeline"
        go={go}
        details={[
          { "Project Start": projStart },
          { "Project Deadline": projDeadline },
        ]}
      />
      <RenderAccordion
        summary="Project Team"
        go={go}
        details={[{ "Project Manager": projManager }]}
      />
      <rux-accordion>
        <span slot="label">JSON View</span>
        <div slot="content" style={{ whiteSpace: "normal", alignSelf: "flex-start", width: "368px" }}>
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
          onClick={() => navigation.previous()}
        >
          Back
        </button>
        <button
          className="rux-button"
          type="button"
          value="Submit"
          style={{ marginTop: "1rem" }}
          onClick={() => navigation.next()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <rux-accordion>
    <span slot="label">{summary}</span>
    <div slot="content" style={{ whiteSpace: "normal", alignSelf: "flex-start", width: "368px" }}>
      <ul>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];
          return <li>{`${objKey}: ${objValue}`}</li>;
        })}
      </ul>
      <div style={{ float: "right" }} className="rux-button-group">
        <rux-button
          size="small"
          iconOnly
          onClick={() => go(`${summary.toLowerCase()}`)}
        >
          <rux-icon icon="resources" library="/icons/astro.svg" />
        </rux-button>
      </div>
    </div>
  </rux-accordion>
);
