import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const ProjectRequirements = () => {
  const [requirements, setRequirements] = useState([]);

  const getRequirements = async (user_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/projects/requirements/${user_id}`
      );
      const jsonData = await response.json();
      setRequirements(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user)
      getRequirements(user.user_id);
    }
  },[]);

  

  

  const deleteRequirement = async requirement_id => {
    try {
        let body = {requirement_id
          }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        await fetch(`http://localhost:3001/projects/requirements`, requestOptions)
          .then(response => response.json())
          .then(response => {
          if(response.status === "failed")
          alert(response.message)})


        setRequirements(requirements.filter(each => each.requirement_id !== requirement_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <table id="projectRequirements" className="rux-table">
      <tbody>
        <tr className="rux_table__column-head">
          <th>Description</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {requirements.map((each) => (
          <tr key={each.requirement_id}>
            <td>{each.requirement_desc}</td>
            <td>{each.priority}</td>
            <td>{each.requirement_status}</td>
            {/* <td>{<EditRequirement each={each} /> }</td> */}
            <td><rux-button>Edit</rux-button></td>
            <td><button
                  className="rux-button"
                  onClick={() => deleteRequirement(each.requirement_id)}
                >
                  Delete
                </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectRequirements;
