import React from "react";

import IssueTrackerGM from "./Issue-Tracker/IssueGM";
import GanttChart from "./gantt-chart/App";
import ProjectRequirements from "./requirements/Requirements";


export default function GeneralManagerDashboard(props) {
  return (
    <div className="dashboard" id="gmDashboard">
      <section className="project-select col-1">
        <select >
          <option>USSF Leave Tracker</option>
          <option>SAT-STAT</option>
          <option>Autonomous Warfare Decision Maker</option>
        </select>
      </section>

      <section className="project-timeline col-11">
        <h2>Gantt Chart</h2>
        <GanttChart />
      </section>
      {/* <section className="gm-funding-requests col-s-6 col-4"><h5>All Open Funding Requests</h5></section>
      <section className="gm-budget col-s-6 col-4"><h5>Budget Overview</h5></section>
      <section className="gm-issues col-s-6 col-4">
        {/* {/* <h5>All Issues</h5>
        <IssueTrackerGM /> */}
        {/* </section> */}
      {/* <section className="gm-requirements col-s-6 col-4"><h5>All Requirements</h5></section> */}
  </div>
  );
}
