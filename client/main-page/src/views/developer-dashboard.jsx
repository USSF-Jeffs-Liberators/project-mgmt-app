import React from "react";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
import IssueTracker from "./Issue-Tracker/Issue";
import ProjectRequirements from "./requirements/Requirements";

export default function DeveloperDashboard(props) {
  return (
    <div className="dashboard" id="developerDashboard">
      <section className="project-timeline col-12">
        <h3>Timeline</h3>
        <GanttChart />
      </section>
      <section className="project-team col-s-6 col-6">
        <h3>Team Members</h3>
        <TeamRoster />
      </section>{" "}
      
      <section className="project-issues col-s-6 col-6">
        <h3>Issues Tracker</h3>
        <IssueTracker />
      </section>{" "}
      <section className="project-requirements col-s-6 col-6">
        <h3>Project Requirements</h3>
        <ProjectRequirements />
      </section>
      
    </div>
  );
}
