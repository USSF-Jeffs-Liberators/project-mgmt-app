import React from "react";
import GanttChart from "./gantt-chart/App";
import ProjectRequirements from "./requirements/Requirements";

export default function GeneralManagerDashboard(props) {
  return (
<<<<<<< HEAD
    <div class="dashboard">
      <section class="project-timeline col-12">
        <h5>Selected Project Gantt Chart</h5>
        <GanttChart />
      </section>
      <section class="gm-funding-requests col-s-6 col-4">
        <h5>All Open Funding Requests</h5>
      </section>
      <section class="gm-budget col-s-6 col-4">
        <h5>Budget Overview</h5>
      </section>
      <section class="gm-issues col-s-6 col-4">
        <h5>All Issues</h5>
      </section>
      <section class="gm-requirements col-s-6 col-4">
        <h5>All Requirements</h5>
        <ProjectRequirements />
      </section>
    </div>
=======
    <div className="dashboard" id="gmDashboard">
      <section className="project-timeline col-s-12 col-8"><h5>Selected Project Gantt Chart</h5></section>
      <section className="gm-funding-requests col-s-6 col-4"><h5>All Open Funding Requests</h5></section>
      <section className="gm-budget col-s-6 col-4"><h5>Budget Overview</h5></section>
      <section className="gm-issues col-s-6 col-4"><h5>All Issues</h5></section>
      <section className="gm-requirements col-s-6 col-4"><h5>All Requirements</h5></section>
  </div>
>>>>>>> main
  );
}
