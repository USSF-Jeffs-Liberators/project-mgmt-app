import React, { useEffect, useState } from "react";
import { useForm } from "react-hooks-helper";
import { RenderAccordion } from "./ProjReview";
import axios from "axios";

const defaultData = {
  project_id: "",
  project_name: "",
  project_desc: "",
  budget: "",
  start_date: "",
  deadline_date: "",
  project_manager: "",
};

export const renderMgrData = ({lastProj}) => {
  const { project_manager } = lastProj;
  const [mgrData, setMgrData] = useState({ first_name: "TestName" });

  useEffect(() => {
    const fetchMgrData = async () => {
      var result = await axios(`http://localhost:3001/users/${project_manager}`);
      setMgrData(result.data[0]);
    };
    fetchMgrData();
  }, [project_manager]);
  return mgrData;
};

export const ProjSubmit = ({ formData }) => {
  const [lastProj, setLastProj] = useState(defaultData);
  const props = { lastProj };
  const {
    project_id,
    project_name,
    project_desc,
    budget,
    start_date,
    deadline_date,
    project_manager,
  } = lastProj;

  useEffect(() => {
    const fetchProjData = async () => {
      var result = await axios(`http://localhost:3001/projects/`);
      setLastProj(result.data.slice(-1)[0]);
    };
    fetchProjData();
  }, []);

  var mgrData = renderMgrData(props);

  function parseDate(d) {
    if (d != null) {
      var date = new Date(d);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    } else return null;
  }

  return (
    <div className="flex-child" style={{ flexDirection: "column" }}>
      {lastProj ? (
        <div>
          <h1>The project has been created!</h1>
          <RenderAccordion
            summary="Project Information"
            details={[
              { "Project ID": project_id },
              { "Project Name": project_name },
              { "Project Description": project_desc },
              { "Project Budget": budget },
              { "Project Start": parseDate(start_date) },
              { "Project Deadline": parseDate(deadline_date) },
              { "Project Manager": `${mgrData.first_name}${
                mgrData.last_name ? " " : ""
              }${mgrData.last_name}` },
            ]}
          />
        </div>
      ) : (
        <p>An error has occurred. Success unconfirmed.</p>
      )}
    </div>
  );
};
