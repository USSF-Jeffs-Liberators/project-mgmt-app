import React from "react";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
import IssueTracker from "./Issue-Tracker/Issue";
import ProjectRequirements from "./requirements/Requirements";

export default function DeveloperDashboard(props) {
  return (
    <div className="dashboard" id="developerDashboard">
      <section className="project-timeline col-12">
        <h2>Gantt Chart</h2>
        <GanttChart />
      </section>
      <section className="project-requirements col-4">
        <h2>Project Requirements</h2>
        <ProjectRequirements />
      </section>
      <section className="project-issues col-4">
        <h2>Issues Tracker</h2>
        <IssueTracker />
      </section>
      <section className="project-team col-4">
        <h2>Team Members</h2>
        <TeamRoster/>
      </section>
    </div>
  );
}
