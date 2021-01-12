import React, { useEffect, useState } from "react";

import AuthService from "../../services/auth.service";


const IssueTracker = () => {
  // mock selected project
  //const project_id = 2;

  //mock logged in user
   //const user_id = 6;

  //DECLARE FUNCTION FOR GETTING PROJECT ID FROM USER ID
  const [project_id, setProjectID] = useState("");

  const getProjectID = async (user_id) => {
    try 
    {
      console.log("BEFORE FETCH");
      console.log(user_id);
      const response = await fetch(`http://localhost:3001/users/${user_id}/team`);
      const jsonData = await response.json();
      console.log("AFTER FETCH");
      setProjectID(jsonData[0].project_id);

      console.log("AFTER SETPROJECTID");
      console.log(jsonData[0].project_id);
    }
    catch (err)
    {
      console.error(err.message);
    }
  }


  //GET USER ID FROM AUTH
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //CALL FUNCTION TO GET PROJECT ID PASSING IN THE USER ID
      getProjectID(user.user_id);
    }

  }, []);



  //Vars for functions below.
  const [issues, setIssues] = useState([]);
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
  });


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
            <th>Resolved</th>
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
