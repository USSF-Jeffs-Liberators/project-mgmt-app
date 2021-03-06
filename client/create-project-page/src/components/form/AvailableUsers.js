import React, { useState, useEffect } from "react";
import { RuxAccordion } from "../rux-accordion";

export const AvailableUsers = ({ UserFilter, userData }) => {
  return (
    <div
      className="flex-child"
      style={{
        flexDirection: "column",
        minWidth: "950px",
        maxWidth: "950px",
        marginRight: "5em",
      }}
    >

      <div>
        <h1 class="project-header">Available Team Members</h1>
        <RenderAccordion
          summary="Project Managers"
          availUsers={UserFilter("Project Manager")}
        />
        <RenderAccordion
          summary="Developers"
          availUsers={UserFilter("Developer")}
        />
      </div>

      <div>
      <h1 class="project-header">All Team Members</h1>
        <RenderAccordion
          summary="All Developers And Project Managers"
          availUsers={userData.filter((each) => each.first_name != "admin")}
        />
      </div>
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
            {summary === "All Developers And Project Managers" ? (
              <th>Role</th>
            ) : (
              ""
            )}
            <th>Project Name</th>
            <th>Project Start Date</th>
            <th>Project Deadline</th>
          </tr>
          {availUsers.map((each) => (
            <tr key={each.user_id}>
              <td>{each.first_name}</td>
              <td>{each.last_name}</td>
              {summary === "All Developers And Project Managers" ? (
                <td>{each.name}</td>
              ) : (
                ""
              )}
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
