import React from "react";
import { RuxTabs } from '@astrouxds/rux-tabs';

export default function Root(props) {
  return  (
    <rux-tab-panels aria-labelledby="tab-set-id-1">
      <rux-tab-panel aria-labelledby="tab-id-1">Tab 1 HTML Content</rux-tab-panel>
      <rux-tab-panel aria-labelledby="tab-id-2">Tab 2 HTML Content</rux-tab-panel>
      <rux-tab-panel aria-labelledby="tab-id-3">Tab 3 HTML Content</rux-tab-panel>
    </rux-tab-panels>
  );
}
