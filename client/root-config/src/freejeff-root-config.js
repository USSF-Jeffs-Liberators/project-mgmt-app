import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

// Astro UI shared components
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar/rux-global-status-bar.js";
import { RuxButton } from "@astrouxds/rux-button/rux-button.js";
import { RuxTabs } from "@astrouxds/rux-tabs/rux-tabs.js";

const routes = constructRoutes(document.querySelector("#single-spa-layout"), {
  loaders: {
    navbar: "<p>Loading navbar</p>",
    mainPage: "<p>Loading main-page</p>",
    createProjectPage: "<p>Loading create-project-page</p>",
    financePage: "<p>Loading finance-page</p>",
    ganttChart: "<p>Loading gantt-chart</p>"
  },
  errors: {
    navbar: "<p>Failed to load navbar</p>",
    mainPage: "<p>Failed to load main-page</p>",
    createProjectPage: "<p>Failed to load create-project-page</p>",
    financePage: "<p>Failed to load finance-page</p>",
    ganttChart: "<p>Failed to load gantt-chart</p>"
  },
});
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
