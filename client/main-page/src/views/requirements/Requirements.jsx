import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const ProjectRequirements = () => {
  // mock selected project
  const project_id = 2;

  const [requirements, setRequirements] = useState([]);

  const getRequirements = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/projects/${project_id}/requirements`
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
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    getRequirements();
  }, []);

  const []
  

  const deleteRequirement = async id => {
    try {
        let body = {id
          }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        await fetch(`http://localhost:3001/requirements`, requestOptions)
          .then(response => response.json())
          .then(response => {
          if(response.status === "failed")
          alert(response.message)})


        setRequirements(requirements.filter(each => each.id !== id));
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
                  // onClick={() => deleteRequirement(each.id)}
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
