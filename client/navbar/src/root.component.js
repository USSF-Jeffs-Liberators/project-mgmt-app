import React from "react";
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import { RuxTabs } from '@astrouxds/rux-tabs/rux-tabs.js';

export default function Root(props) {
  return (
    <rux-global-status-bar class="dark-theme" appname="Project Management App">
      <rux-tabs id="tab-set-id-1">
        <rux-tab id="tab-id-1">Project Dashboard</rux-tab>
        <rux-tab id="tab-id-2">Manage Team</rux-tab>
        <rux-tab id="tab-id-3">Submit Funding Request</rux-tab>
      </rux-tabs>
      <rux-button-group>
        <rux-button>Log In</rux-button>&nbsp;
        <rux-button>Sign Up</rux-button>
      </rux-button-group>
    </rux-global-status-bar>
  )
}
