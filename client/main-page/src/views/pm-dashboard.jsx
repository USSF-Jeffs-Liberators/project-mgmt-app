import React from "react";
import GanttChart from "./gantt-chart/App";
import TeamRoster from "./team/Team";
import IssueTrackerPM from "./Issue-Tracker/IssuePM";
import ProjectRequirements from "./requirements/Requirements";

export default function ProjectManagerDashboard(props) {
  return (
    <div className="dashboard" id="pmDashboard">
      <section className="project-timeline col-12">
        <h3>Gantt Chart</h3>
        <GanttChart />
      </section>{" "}
      <section className="project-team col-4">
        <h3>Team Members</h3>
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
