import React from "react";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
import IssueTracker from "./Issue-Tracker/Issue";
import ProjectRequirements from "./requirements/Requirements";

export default function ProjectManagerDashboard(props) {
  return (
    <div className="dashboard" id="pmDashboard">
      <section className="project-timeline col-12">
        <h5>Gantt Chart</h5>
        <GanttChart />
      </section>
      <section className="project-requirements col-s-6 col-4">
        <h5>Project Requirements</h5>
        <ProjectRequirements />
      </section>
      <section className="project-issues col-s-6 col-4">
        <h5>Issues Tracker</h5>
        <IssueTracker />
      </section>
      <section className="project-team col-s-6 col-4">
        <h5>Team Members</h5>
        <TeamRoster />
      </section>
    </div>
  );
}
