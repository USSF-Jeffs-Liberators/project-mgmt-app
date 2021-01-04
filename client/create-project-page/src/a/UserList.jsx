import React from "react";

export default function UserList(props) {
  return (
    <div>
      <h3>Developers</h3>
      {props.developerList.map((developer) => (
        <li>{developer}</li>
      ))}
      <h3>Project Managers</h3>
      {props.pmList.map((pm) => (
        <li>{pm}</li>
      ))}
    </div>
  );
}
