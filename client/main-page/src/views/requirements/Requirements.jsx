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

  return (
    <table className="rux-table">
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
            <td>{each.requirement_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectRequirements;
