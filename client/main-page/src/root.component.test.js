import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import Root from "./root.component";

Enzyme.configure({ adapter: new Adapter() });


// describe("Home Page", () => {
//   let wrapper = {};
//   beforeEach(() => wrapper = shallow(<Root />))

//   it("goes to '/' path when app name is clicked", () => {
//     wrapper.find("#navbarLogo").simulate("click")
//     expect(global.window.location.pathname).toEqual('/');
//   })
// });


// describe("Logged Out", () => {
//   let wrapper = {};
//   beforeEach(() => {
//     wrapper = shallow(<Root 
//       loggedIn={false} 
//     />)
//   })

//   it("shows login button when no one is logged in", () => {
//     expect(wrapper.exists('.loginLink')).toEqual(true);
//   })
//   it("shows signup button when no one is logged in", () => {
//     expect(wrapper.exists('.signupLink')).toEqual(true);
//   })
//   it("login button renders login page", () => {
//     wrapper.find(".loginLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/login');
//   });
//   it("signup button renders signup page", () => {
//     wrapper.find(".signupLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/signup');
//   })
// });


// describe("Logged In", () => {
//   let wrapper = {};
//   beforeEach(() => {
//     wrapper = shallow(<Root 
//       loggedIn={true} 
//     />)
//   })

//   it("logout button renders logout page", () => {
//     wrapper.find(".logoutLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/logout');
//   });
// });

// describe("Developer", () => {
//   let wrapper = {};
//   beforeEach(() => {
//     wrapper = shallow(<Root 
//       loggedIn={true} 
//       userType={"Developer"}
//     />)
//   })

//   it("dashboard tab renders dashboard page", () => {
//     wrapper.find(".dashboardLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/');
//   });
//   it("tasks tab renders tasks page", () => {
//     wrapper.find(".taskLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/tasks');
//   });
//   it("issues tab renders issues page", () => {
//     wrapper.find(".issueLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/issue');
//   });
// });

// describe("Project Manager", () => {
//   let wrapper = {};
//   beforeEach(() => {
//     wrapper = shallow(<Root 
//       loggedIn={true} 
//       userType={"Project Manager"}
//     />)
//   })

//   it("dashboard tab renders dashboard page", () => {
//     wrapper.find(".dashboardLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/');
//   });
//   it("tasks tab renders tasks page", () => {
//     wrapper.find(".taskLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/tasks');
//   });
//   it("finance tab renders budget page", () => {
//     wrapper.find(".financeLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/finance');
//   });
// });

// describe("General Manager", () => {
//   let wrapper = {};
//   beforeEach(() => {
//     wrapper = shallow(<Root 
//       loggedIn={true} 
//       userType={"General Manager"}
//     />)
//   })

//   it("manage projects tab renders projects page", () => {
//     wrapper.find(".projectsLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/projects');
//   });
//   it("manage teams tab renders team management page", () => {
//     wrapper.find(".teamsLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/teams');
//   });
//   it("finance tab renders budget page", () => {
//     wrapper.find(".financeLink").simulate("click")
//     expect(global.window.location.pathname).toEqual('/finance');
//   });
// });
