import React from "react";
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';

export default function Root(props) {
  return  (
      <rux-global-status-bar>
        <header>
          <h1>Project Management App</h1>
        </header>
      </rux-global-status-bar>
  );
}
