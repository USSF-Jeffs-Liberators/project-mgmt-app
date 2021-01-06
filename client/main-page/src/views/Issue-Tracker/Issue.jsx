import React, { useEffect, useState } from "react";

const IssueTracker = () => {
  // mock selected project
  const project_id = 2;
  //mock logged in user
  const user_id = 1;

  const [issues, setIssues] = useState([]);
  const [team, setTeam] = useState([]);
  const matches = [];

  const getAllIssues = async () => {
    try {
      const response = await fetch(`http://localhost:3001/issues`);
      const jsonData = await response.json();
      setIssues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, []);
  // const getAllUsers = async () => {
  //     try {
  //         const response = await fetch(`http://localhost:3001/users`);
  //         const jsonData = await response.json();
  //         setUsers(jsonData);
  //     } catch (err) {
  //         console.error(err.message);
  //     }
  // };

  // useEffect(() => {
  //     getAllUsers();
  // }, []);

  // const getTeamRoster = async () => {
  //     try {
  //         const response = await fetch(`http://localhost:3001/projects/${project_id}/team`);
  //         const jsonData = await response.json();
  //         setTeam(jsonData);
  //     } catch (err) {
  //         console.error(err.message);
  //     }
  // };

  // useEffect(() => {
  //     getTeamRoster();
  // }, []);

  const getMatches = () => {
    issues.map((issue) => {
      if (issue.project_id === project_id) {
        matches.push(issue);
      }
    });
  };

  // // match team roster to users
  // const getMatches = () => {
  //     team.map(each => (users.map(user => {
  //         each.user_id === user.user_id
  //             ? matches.push(user)
  //             : null
  //     })))

  //     // sort by last name
  //     matches.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
  //     matches.map(each => {
  //         if (each.user_type === "Project Manager") {
  //             matches.splice(matches.indexOf(each), 1)
  //             matches.unshift(each)
  //         }
  //     })
  // }

  // const getAllIssues = async () => {
  //     try {
  //         const response = await fetch(`http://localhost:3001/issues`)
  //         const jsonData = await response.json();
  //         setIssues(jsonData);
  //     }
  //     catch(err)
  //     {
  //         console.error(err.message);
  //     }
  // };

  // useEffect(() => {
  //     getAllIssues();
  // }, []);

//   addIssue = async () =>
//   {
//       const todayDate = new Date();

//       const settings = {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//               project_id: project_id,
//               author: user_id,
//               issue_desc: "My issue is that we dont have a form to input issue descriptions",
//               severity: "Low",
//               issue_timestamp: todayDate.toLocaleString(),
//               is_resolved: false,
//               resolve_date: null,
//               resolution: null
//           })
//       };
//       try {
//           const response = await fetch(`http://localhost:3001/issues`, settings);
//           const json = await fetchResponse.json();
//       }
//       catch(err)
//       {
//           console.error(err.message);
//       }
//   }

//   handleAddIssue = () =>
//   {
//       console.log("made it");
//        //addIssue();
//   }

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
              <td>{user.is_resolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Add Issue</button>
      {/* <p>{users[0].issue_id}</p> */}
    </div>

    //     // <table className="rux-table">
    //     //     <tbody>
    //     //         <tr className="rux_table__column-head">
    //     //             <th>Last Name</th>
    //     //             <th>First Name</th>
    //     //             <th>Role</th>
    //     //         </tr>
    //     //         {getMatches()}
    //     //         {matches.map(user => (
    //     //             <tr key={user.user_id}>
    //     //                 <td>{user.last_name}</td>
    //     //                 <td>{user.first_name}</td>
    //     //                 <td>{user.user_type}</td>
    //     //             </tr>
    //     //         ))}
    //     //     </tbody>
    //     // </table>
  );
};

export default IssueTracker;
