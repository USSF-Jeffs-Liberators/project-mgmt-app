import React from "react";
import UsersService from "/users-service/src/root.component.js"
// import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
// import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

export default function Root(props) {
  return  (
    <div>
      <rux-global-status-bar>
        <header>
          <h1>Project Management App</h1>
        </header>
      </rux-global-status-bar>
      <UsersService />
    </div>
  );
}
