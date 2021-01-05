import React from "react";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
import ProjectRequirements from "./requirements/Requirements";

export default function ProjectManagerDashboard(props) {
  return (
    <div class="dashboard">
      <section class="project-timeline col-12">
        <h5>Gantt Chart</h5>
        <GanttChart />
      </section>
      <section class="project-requirements col-s-6 col-4">
        <h5>Project Requirements</h5>
        <ProjectRequirements />
      </section>
      <section class="project-issues col-s-6 col-4">
        <h5>Issues Tracker</h5>
      </section>
      <section class="project-team col-s-6 col-4">
        <h5>Team Members</h5>
        <TeamRoster />
      </section>
    </div>
  );
}
