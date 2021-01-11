import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useStep } from "react-hooks-helper";
import { ProjInfo } from "./form/ProjInfo";
import { ProjTimeline } from "./form/ProjTimeline";
import { AvailableUsers } from "./form/ProjTeam";

const defaultData = {
  projName: "",
  projDesc: "",
  projStart: "",
  projDeadline: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};

const steps = [
  { id: "info" },
  { id: "timeline" },
  { id: "team" },
  { id: "budget" },
  { id: "review" },
  { id: "submit" },
];

export const MultiStepForm = () => {
  const [userData, setUserData] = useState({ hits: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await axios(`http://localhost:3001/users/projects`);
      setUserData(result.data);
    };
    fetchUserData();
  }, []);

  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation, userData };

  switch (step.id) {
    case "info":
      return <ProjInfo {...props} />;
    case "timeline":
      return <ProjTimeline {...props} />;
    case "team":
      return <AvailableUsers {...props} />;
  }

  return (
    <div>
      <h1>Multi Step Form</h1>
    </div>
  );
};