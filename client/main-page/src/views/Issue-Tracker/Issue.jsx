import React, { useEffect, useState } from "react";

const IssueTracker = () => {
  // mock selected project
  const project_id = 2;
  //mock logged in user
  const user_id = 1;

  const [issues, setIssues] = useState([]);
  const [team, setTeam] = useState([]);
  const matches = [];

  //Obtain all issues function
  const getAllIssues = async () => {
    try {
      const response = await fetch(`http://localhost:3001/issues`);
      const jsonData = await response.json();
      setIssues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Store all issues in array
  useEffect(() => {
    getAllIssues();
  }, []);


  //Obtain all issues for matched project id
  const getMatches = () => {
    issues.map((issue) => {
      if (issue.project_id === project_id) {
        matches.push(issue);
      }
    });
  };

  return (
    <div>
      <table className="rux-table">
        <tbody>
          <tr className="rux_table__column-head">
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
          {getMatches()}
          {matches.map((user) => (
            <tr key={user.issue_id}>
              <td>{user.issue_desc}</td>
              <td>{user.severity}</td>
              <td>{user.is_resolved.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTracker;
