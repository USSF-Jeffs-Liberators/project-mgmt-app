import React from "react";
import { RuxAccordion } from "../Accordion/rux-accordion";

export const AvailableUsers = ({ navigation, userData }) => {
  const { go } = navigation;

  const availUsers = [{
    'user_id': '1000', 
    'first_name': 'Test', 
    'last_name': 'User', 
    'project_name': 'Test Project', 
    'start_date': '2020-07-01T00:00:00.000Z', 
    'deadline_date': '2020-08-31T00:00:00.000Z'
    }]

  return (
    <div>
      <h1>Available Team Members</h1>
      <RenderAccordion summary="Project Managers" availUsers={userData.hits.filter((each) => (each.name==="Project Manager"))}/>
      <RenderAccordion summary="Developers" availUsers={userData.hits.filter((each) => (each.name==="Developer"))}/>
      <button
        className="rux-button"
        type="button"
        style={{ marginTop: "1rem" }}
        onClick={() => go("submit")}
      >
        Submit
      </button>
    </div>
  );
};

function parseDate(d) {
  if (d != null) {
    var date = new Date(d);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  } else return null;
}

export const RenderAccordion = ({ summary, availUsers }) => (
  <rux-accordion>
    <span slot="label">{summary}</span>
    <span slot="content">
      <table className="rux-table">
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Project Name</th>
            <th>Project Start Date</th>
            <th>Project Deadline</th>
          </tr>
          {availUsers.map((each) => (
            <tr key={each.user_id}>
              <td>{each.first_name}</td>
              <td>{each.last_name}</td>
              <td>{each.project_name}</td>
              <td>{parseDate(each.start_date)}</td>
              <td>{parseDate(each.deadline_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </span>
  </rux-accordion>
);
