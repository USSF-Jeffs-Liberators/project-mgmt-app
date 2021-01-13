import React, { useEffect, useState } from "react";

//ISSUE TRACKER FOR PROJECT MANAGER


const IssueTrackerPM = () =>
{
    //mock logged in Project Manager user
    const user_id = 4;
    const projectManager_id = user_id;
  
    const [issues, setIssues] = useState([]);
    const [projects, setProjects] = useState([]);
    const [team, setTeam] = useState([]);
    const [months, setMonths] = useState([]);
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
  
    // Sets Month Abbreviations
    useEffect(() => {
      setMonths([
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ])
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



  // Formats the Date Output
  const parseDatabaseDate = (databaseDate) => {
    if (databaseDate === null) {
      return "N/A";
    }
    var date = new Date(databaseDate);
    return (
      date.getDate() +
      " " +
      months[date.getMonth()] +
      " " +
      date.getFullYear() +
      " @ " +
      date.getHours() +
      ":" +
      (date.getMinutes()<10?'0':'') + date.getMinutes()
    );
    return "N/A"
  }

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
                <td>{parseDatabaseDate(user.issue_timestamp)}</td>
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