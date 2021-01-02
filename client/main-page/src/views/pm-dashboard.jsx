import React from "react";

export default function ProjectManagerDashboard(props) {

  return (
    <div class="dashboard">
      <section class="project-timeline col-s-12 col-8"><h5>Gantt Chart</h5></section>
      <section class="project-issues col-s-6 col-4"><h5>Issues Tracker</h5></section>
      <section class="project-budget col-s-6 col-4"><h5>Budget Overview</h5></section>
      <section class="project-team col-s-6 col-4"><h5>Team Members</h5></section>
      <section class="project-requirements col-s-6 col-4"><h5>Project Requirements</h5></section>
      <section class="project-tasks col-s-6 col-4"><h5>Task List</h5></section>
    </div>
  );
}
