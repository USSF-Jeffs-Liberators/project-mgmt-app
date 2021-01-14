import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import EditRequirement from "./EditRequirement"
import {ReqModal} from "./ReqModal"

const ProjectRequirements = () => {
  const [requirements, setRequirements] = useState([]);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState("");

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
//modal functions
  const openRequirementModal = (requirement) => {
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
    // document.querySelector("#progress-svg").style.display = 'none';
  }

  const toggleElementsOn = () => {
    document.querySelector("body").style.overflow = "auto";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'inline-flex')
    // document.querySelector("#progress-svg").style.display = 'inline-flex';
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
  // const addRequirement = async (reqDesc, reqType, reqStatus) => {
  //   var requirement = {};
  //   requirement.project_id = requirements[0].project_id;
  //   requirement.requirment_desc = reqDesc;
  //   requirement.priority = priority;
  //   requirement.requirement_status = reqStatus;

  //   await fetch("http://localhost:3001/requirements", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requirement),
  //   }).then(getRequirements());
  // }

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
          showRequirementModal={showRequirementModal}
          closeRequirementModal={closeRequirementModal}
          // addRequirement={addRequirement}
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {requirements.map((each) => (
            <tr key={each.requirement_id}>
              <td>{each.requirement_desc}</td>
              <td>{each.priority}</td>

              <td><font color={getStatusColor(each.requirement_status)}>{each.requirement_status}</font></td>
              {/* <td>{<EditRequirement each={each} /> }</td> */}
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
        </tbody>
      </table>
    </div>
    
  );
};

export default ProjectRequirements;
