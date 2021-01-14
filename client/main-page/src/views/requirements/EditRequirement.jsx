import React, { Fragment, useState } from "react";

const EditRequirement = ({ each }) => {
  const [requirement_desc, setRequirementDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [requirement_status, setRequirementStatus] = useState("");

  //edit SR function

  const updateRequirement = async e => {
    e.preventDefault();
    try {
      const body = { requirement_desc, priority, requirement_status };
      const response = await fetch(
        `http://localhost:3001/requirements/${each.requirement_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="rux-button"
        data-toggle="rux-modal-container"
        data-target={`#id${each.id}`}
      >
        Edit
      </button>

      <div className="rux-modal-container"
        id={`id${each.id}`}
        onClick={() => {
          setRequirementDescription(each.requirement_desc)
          setPriority(each.priority)
          setRequirementStatus(each.requirement_status)
          }}>
        <dialog class="rux-modal" role="dialog" open="">
          <header class="rux-modal__titlebar">
            <h2>Edit Requirement</h2>
          </header>
          <div class="rux-modal__content">
            <div class="rux-modal__input">
              
            
              <input
                type="text"
                className="form-control"
                value={requirement_desc}
                placeholder= {requirement_desc}
                onChange={e => setRequirementDescription(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={priority}
                placeholder= {priority}
                onChange={e => setPriority(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={requirement_status}
                placeholder= {requirement_status}
                onChange={e => setRequirementStatus(e.target.value)}
              />
            
            </div>
            <div class="rux-button-group">
              <rux-button data-value="false" tabindex="-1" outline="">
                Cancel
              </rux-button>
              <rux-button 
                data-value="true"
                tabindex="0"
                onClick={e => updateRequirement(e)}>
                Update
              </rux-button>
            </div>
          </div>
        </dialog>
      </div>


      {/* <div
        className="rux-modal"
        id={`id${each.id}`}
        onClick={() => {
            setRequirementDescription(each.requirement_desc)
            setPriority(each.priority)
            setRequirementStatus(each.requirement_status)
            }}
      >
        <div class="rux-modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Requirement</h4>
              { <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                  setRequirementDescription(each.requirement_desc)
                  setPriority(each.priority)
                  setRequirementStatus(each.requirement_status)
                    }
                }>
                &times;
              </button> }
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={requirement_desc}
                placeholder= {requirement_desc}
                onChange={e => setRequirementDescription(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={priority}
                placeholder= {priority}
                onChange={e => setPriority(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={requirement_status}
                placeholder= {requirement_status}
                onChange={e => setRequirementStatus(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateRequirement(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                // onClick={() => setName(each.sr_name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default EditRequirement;