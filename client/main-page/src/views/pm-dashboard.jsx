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
<<<<<<< HEAD
      <section className="project-issues col-s-12 col-6">
        <h2>Issues Tracker</h2>
        <IssueTrackerPM />
      </section>
      <section className="project-team col-s-12 col-6">
=======
      
      <section className="project-issues col-s-6 col-4">
        <h2>Issues Tracker</h2>
        <IssueTrackerPM />
      </section>{" "}
      <section className="project-team col-s-6 col-4">
>>>>>>> 5a9b91a (started requirements-3 branch)
        <h2>Team Members</h2>
        <TeamRoster/>
<<<<<<< HEAD
      </section>
      <section className="project-requirements col-12">
=======
      </section>{" "}
      <br/>
      <section className="project-requirements col-s-6 col-4">
>>>>>>> 5a9b91a (started requirements-3 branch)
        <h2>Project Requirements</h2>
        <ProjectRequirements />
      </section>
      
    </div>
  );
}
