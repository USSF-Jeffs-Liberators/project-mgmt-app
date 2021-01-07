import React, { useState, useEffect } from "react";

export default function UserList(props) {
  return (
    <div>
      <h3>Developers</h3>
      <ul>
        {props.developers.map((developer) => (
          <li key={developer.user_id}>
            {developer.first_name} {developer.last_name}
          </li>
        ))}
      </ul>
      <h3>Project Managers</h3>
      <ul>
        {props.projectManagers.map((pm) => (
          <li key={pm.user_id}>
            {pm.first_name} {pm.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
