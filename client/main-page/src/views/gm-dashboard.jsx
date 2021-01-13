import React, { useEffect } from "react";

// import IssueTrackerGM from "./Issue-Tracker/IssueGM";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
// import ProjectRequirements from "./requirements/Requirements";

export default function GeneralManagerDashboard() {

  if (localStorage.getItem("selectedProjectId") === null) {
    localStorage.setItem("selectedProjectId", 1)
  }

  var projects = [];

  const getProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/projects')
      const json = await response.json()
      projects = json
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    getProjects();
  });

  return (
    <div className="dashboard" id="gmDashboard">
      <section className="project-select col-1">
        <h2>Select Project:</h2>
        <select class="rux-select" id="project-select" onChange={() => {
          let x = document.getElementById("project-select").value
          localStorage.setItem("selectedProjectId", x)
          window.location.reload(false);
        }}>
          <option value="" selected disabled hidden>Select a Project</option>
          <option value="1">USSF Leave Tracker</option>
          <option value="2">SAT-STAT</option>
          <option value="3">Autonomous Warfare Decision Maker</option>
        </select>
      </section>
      <section className="project-timeline col-12">
        <h2>Gantt Chart</h2>
        <GanttChart />
      </section>
      <section className="gm-issues col-s-12 col-6"><h2>This Project's Issues</h2></section>
      <section className="gm-issues col-s-12 col-6">
        <h2>This Project's Team</h2>
        <TeamRoster />
      </section>
      <section className="gm-requirements col-12"><h2>This Project's Requirements</h2></section>
      {/* <section></section> */}
      {/* 
      <section className="gm-issues col-s-6 col-4">
        {/* {/* <h5>All Issues</h5>
        <IssueTrackerGM /> */}
        {/* </section> */}
      {/* <section className="gm-requirements col-s-6 col-4"><h5>All Requirements</h5></section> */}
  </div>
  );
}
