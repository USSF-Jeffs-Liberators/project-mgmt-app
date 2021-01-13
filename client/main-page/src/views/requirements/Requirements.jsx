import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    getRequirements();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return "#08DB0F";
    }
    if (status === "Not Started") {
      return "#FF0000";
    }
    if (status === "Started") {
      return "FDC12A";
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
        </tr>
        {requirements.map((each) => (
          <tr key={each.requirement_id}>
            <td>{each.requirement_desc}</td>
            <td>{each.priority}</td>
            <td><font color={getStatusColor(each.requirement_status)}>{each.requirement_status}</font></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectRequirements;
