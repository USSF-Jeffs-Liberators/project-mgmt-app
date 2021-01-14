import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const ProjectRequirements = () => {

  const userType = JSON.parse(localStorage.getItem('user')).roles[0]

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

  const getStatusColor = (status) => {
    if (status === "Completed" || status === "Low") {
      return "#08DB0F";
    }
    if (status === "Not Started" || status === "High") {
      return "#FF0000";
    }
    if (status === "Started" || status === "Medium") {
      return "#FDC12A";
    }
    if (status === "Cancelled") {
      return "#A9A9A9"
    }
    return "#ffffff";
  }

  return (
    <table id="projectRequirements" className="rux-table">
      <tbody>
        <tr className="rux_table__column-head">
          <th>Description</th>
          <th>Priority</th>
          <th>Status</th>
          {userType !== 'Developer' ? (<th>Edit</th>) : (null)}
          {userType !== 'Developer' ? (<th>Delete</th>) : (null)}
          
        </tr>
        {requirements.map((each) => (
          <tr key={each.requirement_id}>
            <td>{each.requirement_desc}</td>
            <td><font color={getStatusColor(each.priority)}>{each.priority}</font></td>
            <td><font color={getStatusColor(each.requirement_status)}>{each.requirement_status}</font></td>

            {userType !== 'Developer' ? (<td><button className="rux-button">Edit</button></td>) : (null)}
            {userType !== 'Developer' ? (
              <td><button
                className="rux-button"
                onClick={() => deleteRequirement(each.requirement_id)}
              >
                Delete
              </button></td>
            ) : (null)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectRequirements;
