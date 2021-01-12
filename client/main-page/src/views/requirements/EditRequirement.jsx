import React, { Fragment, useState } from "react";

const EditRequirement = ({ each }) => {
  const [sr_task, setTask] = useState("");
  const [sr_contractor, setContractor] = useState("");
  const [sr_name, setName] = useState("");

  //edit SR function

  const updateSR = async e => {
    e.preventDefault();
    try {
      const body = { sr_name, sr_contractor, sr_task };
      const response = await fetch(
        `http://localhost:3001/service_requests/${each.id}`,
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
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${each.id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${each.id}`}
        onClick={() => {
            setName(each.sr_name)
            setContractor(each.sr_contractor)
            setTask(each.sr_task)
            }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Service Request</h4>
              { <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                    setName(each.sr_name)
                    setContractor(each.sr_contractor)
                    setTask(each.sr_task)
                    }
                }>
                &times;
              </button> }
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={sr_name}
                placeholder= {sr_name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={sr_contractor}
                placeholder= {sr_contractor}
                onChange={e => setContractor(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={sr_task}
                placeholder= {sr_task}
                onChange={e => setTask(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateSR(e)}
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
      </div>
    </Fragment>
  );
};

export default EditRequirement;