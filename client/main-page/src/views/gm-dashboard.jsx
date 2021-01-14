import React, { useState, useEffect } from "react";

import IssueTracker from "./Issue-Tracker/Issue";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
// import ProjectRequirements from "./requirements/Requirements";

export default function GeneralManagerDashboard() {

  if (localStorage.getItem("selectedProjectId") === null) {
    localStorage.setItem("selectedProjectId", 1)
  }
  if (localStorage.getItem("selectedProjectName") === null) {
    localStorage.setItem("selectedProjectName", "USSF Leave Tracker")
  }

  return (
    <div className="dashboard" id="gmDashboard">
      <section className="project-select col-1">
        <h2>Select Project:</h2>
        <select class="rux-select" id="project-select" onChange={() => {
          let x = document.getElementById("project-select").value
          localStorage.setItem("selectedProjectId", x)
          switch(x) {
            case "1":
              localStorage.setItem("selectedProjectName", "USSF Leave Tracker")
              break;
            case "2":
              localStorage.setItem("selectedProjectName", "SAT-STAT")
              break;
            case "3":
              localStorage.setItem("selectedProjectName", "Autonomous Warfare Decision Maker")
              break;
            default:
              localStorage.setItem("selectedProjectName", "USSF Leave Tracker")
              break;
          }
          window.location.reload(false);
        }}>
          <option value="" selected disabled hidden>Select a Project</option>
          <option value="1">USSF Leave Tracker</option>
          <option value="2">SAT-STAT</option>
          <option value="3">Autonomous Warfare Decision Maker</option>
        </select>
      </section>
      <section className="col-11">
        <h1>{localStorage.getItem("selectedProjectName")}</h1>
      </section>
      <section className="project-timeline col-12">
        <h2>Timeline</h2>
        <GanttChart />
      </section>
      <section className="gm-issues col-s-12 col-6">
        <h2>Issues Tracker</h2>
        <IssueTracker />
      </section>
      <section className="gm-team col-s-12 col-6">
        <h2>Team Members</h2>
        <TeamRoster />
      </section>
      {/* <section className="gm-requirements col-12">
        <h2>Project Requirements</h2>
        <ProjectRequirements />
      </section> */}
  </div>
  );
}
