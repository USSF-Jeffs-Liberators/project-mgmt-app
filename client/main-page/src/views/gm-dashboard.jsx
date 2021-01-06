import React from "react";

export default function GeneralManagerDashboard(props) {

  return (
    <div className="dashboard" id="gmDashboard">
      <section className="project-timeline col-s-12 col-8"><h5>Selected Project Gantt Chart</h5></section>
      <section className="gm-funding-requests col-s-6 col-4"><h5>All Open Funding Requests</h5></section>
      <section className="gm-budget col-s-6 col-4"><h5>Budget Overview</h5></section>
      <section className="gm-issues col-s-6 col-4"><h5>All Issues</h5></section>
      <section className="gm-requirements col-s-6 col-4"><h5>All Requirements</h5></section>
  </div>
  );
}
