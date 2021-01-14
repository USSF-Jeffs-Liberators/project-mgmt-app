import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useStep } from "react-hooks-helper";
import { ProjInfo } from "./form/ProjInfo";
import { ProjReview } from "./form/ProjReview";
import { ProjSubmit } from "./form/ProjSubmit";
import { AvailableUsers } from "./form/AvailableUsers";

const defaultData = {
  projName: "",
  projDesc: "",
  projBudget: "",
  projStart: "",
  projDeadline: "",
  projManager: "",
};

const steps = [
  { id: "project form" },
  { id: "review" },
  { id: "submit" },
];

function isInDateRange(d, d1, d2) {
  // compare dates
  var date1 = new Date(d1);
  var date2 = new Date(d2);
  var dateToCheck = d === "" ? new Date() : new Date(d); // as long as the date you're curious about is first, doesn't matter if d1/d2 are swapped

  if (
    dateToCheck.getTime() <= date2.getTime() &&
    dateToCheck.getTime() >= date1.getTime()
  ) {
    return true;
  } else if (
    dateToCheck.getTime() >= date2.getTime() &&
    dateToCheck.getTime() <= date1.getTime()
  ) {
    return true;
  } else {
    return false;
  }
}

export const MultiStepForm = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      const result = await axios(`http://localhost:3001/users/projects`);
      setUserData(result.data);
    };
    fetchUserData();
  }, []);

  const [userData, setUserData] = useState([]);
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  function UserFilter(r) {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { projStart, projDeadline } = formData;
    useEffect(() => {
      const filterUsers = (role) => {
        var roleFiltered = userData.filter((each) => each.name === role);
        if (projStart === "" && projDeadline === "") {
          var userDateFiltered = roleFiltered.filter(
            (each) =>
              each.project_id === null ||
              !isInDateRange("", each.start_date, each.deadline_date)
          );
          setFilteredUsers(userDateFiltered);
        } else if (projStart !== "" && projDeadline === "") {
          var formStartDateFiltered = roleFiltered.filter(
            (each) =>
              each.project_id === null ||
              !isInDateRange(projStart, each.start_date, each.deadline_date)
          );
          setFilteredUsers(formStartDateFiltered);
        } else if (projStart === "" && projDeadline !== "") {
          var formDeadlineDateFiltered = roleFiltered.filter(
            (each) =>
              each.project_id === null ||
              !isInDateRange(projDeadline, each.start_date, each.deadline_date)
          );
          setFilteredUsers(formDeadlineDateFiltered);
        } else {
          var formDateFiltered = roleFiltered.filter(
            (each) =>
              each.project_id === null ||
              (!isInDateRange(projStart, each.start_date, each.deadline_date) &&
                !isInDateRange(
                  projDeadline,
                  each.start_date,
                  each.deadline_date
                ))
          );
          setFilteredUsers(formDateFiltered);
        }
      };
      filterUsers(r);
    }, [userData, projStart, projDeadline]);
    return filteredUsers;
  }

  const props = { formData, setForm, navigation, userData, UserFilter };

  switch (step.id) {
    case "project form":
      return (
        <div className="flex-container">
          <ProjInfo {...props} />
          <AvailableUsers {...props} />
        </div>
      );
    case "review":
      return <ProjReview {...props} />;
    // Add button onClick={() => go(`submit`)}
    case "submit":
      return <ProjSubmit {...props} />;
  }

  return (
    <div>
      <h1>Render failed: out of step.</h1>
    </div>
  );
};

{/* <button
            className="rux-button"
            type="button"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              projStart != "" && projDeadline != ""
                ? projStart < projDeadline
                  ? navigation.next()
                  : alert("The deadline must be after the start date.")
                : alert("Please enter a valid date.");
            }}
          >
            Next
          </button> 
        <button
              className="rux-button"
              type="button"
              style={{ marginTop: "1rem" }}
              onClick={() => {
                projManager != ""
                  ? navigation.next()
                  : alert("Please select a project manager.");
              }}
            >
              Next
            </button>*/}