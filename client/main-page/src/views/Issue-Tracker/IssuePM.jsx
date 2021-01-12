import React, { useEffect, useState } from "react";

import AuthService from "../../services/auth.service";

//ISSUE TRACKER FOR PROJECT MANAGER


const IssueTrackerPM = () =>
{

  const [projectManager_id, setProjectManagerID] = useState("");
    //mock logged in Project Manager user
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
        setProjectManagerID(user.user_id);
      }
    }, []);


    // let user_id = 4;
    // //user_id = currentUser.user_id;
    // const projectManager_id = user_id;
  
    const [issues, setIssues] = useState([]);
    const [projects, setProjects] = useState([]);
    const [team, setTeam] = useState([]);
    const matches = [];
    const projMatches = [];
    const projIssues = [];
    const projIssuesSeverity = [];
  
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
  

    //Get all projects function
    const getAllProjects = async () =>
    {
        try {
            const response = await fetch(`http://localhost:3001/projects`);
            const jsonData = await response.json();
            setProjects(jsonData);
          } catch (err) {
            console.error(err.message);
          }
    };

    //Store all projects into array
    useEffect(() => {
        getAllProjects();
    }, []);

    //Obtain all projects for matched project manager ids
    const getMatchesProjects = () => {
        projects.map((proj) => {
          if (proj.project_manager === projectManager_id) {
            projMatches.push(proj);
          }
        });
      };

    const getProjectsIssues = () =>
    {
        projMatches.map((proj) => 
        {

            for(let i = 0; i < issues.length; i++)
            {
                if(issues[i].project_id === proj.project_id)
                {
                    projIssues.push(issues[i]);
                }
            }
        }
        )
    }

    // const sortIssuesBySeverity = () =>
    // {

    //     for(let i = 0; i < projIssues.length; i++)
    //     {
    //         projIssuesSeverity(projIssues[i].severity);
    //     }

    //     // sorting fn
    //     const applyCustomOrder = (arr, desiredOrder) => 
    //     {
    //         const orderForIndexVals = desiredOrder.slice(0).reverse();
    //         arr.sort((a, b) => 
    //         {
    //             const aIndex = -orderForIndexVals.indexOf(a);
    //             const bIndex = -orderForIndexVals.indexOf(b);
    //             return aIndex - bIndex;
    //         });
    //     }
        
    //     // example use
    //     const orderIWant = ['high', 'medium', 'low'];
        
    //     applyCustomOrder(projIssuesSeverity, orderIWant);
    // }

    function saveIssues(priority)
    {
      console.log("HELLO SAVE ISSUES FUNCTION")
      console.log(priority);
    }

    return (
      <div>
        <table className="rux-table">
          <tbody>
            <tr className="rux_table__column-head">
              <th>Description</th>
              <th>Date</th>
              <th>Resolved</th>
              <th>Severity</th>
            </tr>
            {getMatchesProjects()}
            {getProjectsIssues()}
            {/* {sortIssuesBySeverity()} */}
            {projIssues.map((user) => (
              <tr key={user.issue_id}>
                <td>{user.issue_desc}</td>
                <td>{user.issue_timestamp}</td>
                <td><rux-button type="button">{user.is_resolved.toString()}</rux-button></td>

                <td>
                  <select id="priority" className="rux-button" type="text" onChange={() => {
                    let priority = document.getElementById("priority").value;

                    saveIssues(priority);


                  }} required>
                    <option value ="" selected disabled hidden>{user.severity}</option>
                    <option value = "low">Low</option>
                    <option value = "medium">Medium</option>
                    <option value = "high">High</option>
                  </select>

                </td>
                
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
}

export default IssueTrackerPM;