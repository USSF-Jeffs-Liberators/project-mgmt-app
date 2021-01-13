import React from "react";
import { RuxAccordion } from "../../altcomponents/components/Accordion/rux-accordion";

export const AvailableUsers = (props) => {

  return (
    <div className="flex-child" style={{ minWidth: "950px", maxWidth:"950px" }}>
      <h1 style={{ marginTop: "26px" }}>Available Team Members</h1>
      <RenderAccordion
        summary="Project Managers"
        availUsers={props.filterUsers("Project Manager")}
      />
      <RenderAccordion
        summary="Developers"
        availUsers={props.filterUsers("Developer")}
      />
      <h1 style={{ marginTop: "26px" }}>All Team Members</h1>
      <RenderAccordion
        summary="All Developers And Project Managers"
        availUsers={props.userData.filter((each) => each.first_name != 'admin')}
      />
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
            {summary==="All Developers And Project Managers" ? <th>Role</th> : ''}
            <th>Project Name</th>
            <th>Project Start Date</th>
            <th>Project Deadline</th>
          </tr>
          {availUsers.map((each) => (
            <tr key={each.user_id}>
              <td>{each.first_name}</td>
              <td>{each.last_name}</td>
              {summary==="All Developers And Project Managers" ? <td>{each.name}</td> : ''}
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
