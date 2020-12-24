import React from "react";
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';

export default function Root(props) {
  return  (
      <main>
        <rux-global-status-bar appname="Project Management App" version="0.5"></rux-global-status-bar>
      </main>
  );
}
