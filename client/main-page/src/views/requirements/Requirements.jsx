import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import {ReqModal} from "./ReqModal"

const ProjectRequirements = () => {


  const [requirements, setRequirements] = useState([]);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [currentProject, setCurrentProject] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  
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
      setCurrentRole(user.roles[0])
      if(user.roles[0] === "General Manager"){
        setCurrentProject(localStorage.getItem("selectedProjectId"))
      }
    }
  },[]);
//modal functions
  const openRequirementModal = (requirement) => {
    if(currentUser.roles[0] === "Project Manager"){
      setCurrentProject(requirements[0].project_id)
    }
    
    setSelectedRequirement(requirement);
    setRequirementModalElements(requirement);
    setShowRequirementModal(true);
    toggleElementsOff()
  }


  const closeRequirementModal = () => {
    setSelectedRequirement(undefined);
    setShowRequirementModal(false);
    toggleElementsOn()
  }
  
  const toggleElementsOff= () => {
    document.querySelector(".modal-wrapper").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'none')
  }

  const toggleElementsOn = () => {
    document.querySelector("body").style.overflow = "auto";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'inline-flex')
  }

  const setRequirementModalElements = (requirement) => {
    if (requirement !== null) {
      document.getElementById("req-desc").value = requirement.requirement_desc;
      document.getElementById("priority-select").value = requirement.priority;
      document.getElementById("req-status").value = requirement.requirement_status;
    } else {
      document.getElementById("req-desc").value = "";
      document.getElementById("priority-select").value = "";
      document.getElementById("req-status").value = "";
    }
  }
  const addRequirement = async (reqDesc, priority, reqStatus, projectId) => {
    var requirement = {};
    requirement.project_id = projectId;
    requirement.requirement_desc = reqDesc;
    requirement.priority = priority;
    requirement.requirement_status = reqStatus;

    await fetch("http://localhost:3001/requirements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requirement),
    })
    await getRequirements(currentUser.user_id);
  }

  const editRequirement = async (reqDesc, priority, reqStatus, reqId) => {
    var requirement = {};
    
    requirement.requirement_desc = reqDesc;
    requirement.priority = priority;
    requirement.requirement_status = reqStatus;

    await fetch(
      `http://localhost:3001/requirements/${reqId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requirement),
      }
    );
    await getRequirements(currentUser.user_id);
  }

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
  const verifyDescription = (reqDesc) => {
    if (reqDesc.length > 0) {
      return true
    }
    alert('The requirement requires a description.')
  }
  const verifyPriority = (priority) => {
    if (priority.length > 0) {
      return true
    }
    alert('The requirement requires a priority.')
  }
  const verifyStatus = (reqStatus) => {
    if (reqStatus.length > 0) {
      return true
    }
    alert('The requirement requires a status.')
  }


  return (

    <div>
      
      {showRequirementModal ? (
          <div
            className="back-drop"
            onClick={() => {
              closeRequirementModal();
            }}
          ></div>
        ) : null}
      <ReqModal
          selectedRequirement={selectedRequirement}
          currentProject = {currentProject}
          showRequirementModal={showRequirementModal}
          closeRequirementModal={closeRequirementModal}
          addRequirement={addRequirement}
          editRequirement={editRequirement}
          verifyDescription={verifyDescription}
          verifyPriority={verifyPriority}
          verifyStatus={verifyStatus}
        />
      <table id="projectRequirements" className="rux-table">
        <tbody>
          <tr className="rux_table__column-head">
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            {/* {currentRole === "Developer" ? 
              null : ( */}
              
                  <th>Edit</th>
                  <th>Delete</th>
              
            
            
          </tr>
          {requirements.map((each) => (
            <tr key={each.requirement_id}>
              <td>{each.requirement_desc}</td>
              <td>{each.priority}</td>

              <td><font color={getStatusColor(each.requirement_status)}>{each.requirement_status}</font></td>
              <td><button
                    className="rux-button"
                    id = {`req-${each.requirement_id}`}
                    onClick={() => openRequirementModal(each)}
                  >
                    Edit
                  </button></td>
              <td><button
                    className="rux-button"
                    onClick={() => deleteRequirement(each.requirement_id)}
                  >
                    Delete
                  </button></td>
            </tr>
          ))}
          {/* {currentRole === "Developer" ? 
              null :( */}
              <tr class="rux-table__column-head">
              <th colspan="6" className="button-section">
                <div className="button-div1">
                  <button
                    className="rux-button"
                    onClick={() => {
                      openRequirementModal(null);
                    }}
                  >
                    Add Expense
                  </button>
                </div>
              </th>
            </tr> 
        </tbody>
      </table>
    </div>
    
  );
};

export default ProjectRequirements;
