import React from "react";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
import IssueTrackerPM from "./Issue-Tracker/IssuePM";
import ProjectRequirements from "./requirements/Requirements";

export default function ProjectManagerDashboard(props) {
  return (
    <div className="dashboard" id="pmDashboard">
      <section className="project-timeline col-12">

        <h2>Gantt Chart</h2>
        <GanttChart />
      </section>
      <section className="project-requirements col-s-6 col-4">
        <h2>Project Requirements</h2>
        <ProjectRequirements />
      </section>
      <section className="project-issues col-s-6 col-4">
        <h2>Issues Tracker</h2>
        <IssueTrackerPM />
      </section>
      <section className="project-team col-s-6 col-4">
        <h2>Team Members</h2>

        <TeamRoster/>
      </section>{" "}
      <section className="project-issues col-4">
        <h3>Issues Tracker</h3>
        <IssueTrackerPM />
      </section>{" "}
      
      <section className="project-requirements col-4">
        <h3>Project Requirements</h3>
        <ProjectRequirements />
      </section>
    </div>
  );
}
