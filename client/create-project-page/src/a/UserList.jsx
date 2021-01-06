import React, { useState, useEffect } from "react";

export default function UserList(props) {
  function parseDate(d) {
    if (d != null) {
      var date = new Date(d);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    } else return null;
  }

  return (
    <div className="dashboard">
      <section className="col-s-6 col-4">
        <table className="rux-table">
          <tbody>
            <tr className="rux_table__column-head">
              <th colSpan="6" align="center">
                Developers
              </th>
            </tr>
            <tr className="rux_table__column-head">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Project Start Date</th>
              <th>Project Deadline</th>
            </tr>
            {props.developers.map((each) => (
              <tr key={each.user_id}>
                <td>{each.first_name}</td>
                <td>{each.last_name}</td>
                <td>{each.project_id}</td>
                <td>{each.project_name}</td>
                <td>{parseDate(each.start_date)}</td>
                <td>{parseDate(each.deadline_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="col-s-6 col-4">
        <table className="rux-table">
          <tbody>
            <tr className="rux_table__column-head">
              <th colSpan="6" align="center">
                Project Managers
              </th>
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Project Start Date</th>
              <th>Project Deadline</th>
            </tr>
            {props.projectManagers.map((each) => (
              <tr key={each.user_id}>
                <td>{each.first_name}</td>
                <td>{each.last_name}</td>
                <td>{each.project_id}</td>
                <td>{each.project_name}</td>
                <td>{parseDate(each.start_date)}</td>
                <td>{parseDate(each.deadline_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
