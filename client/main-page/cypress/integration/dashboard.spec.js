// describe("Logged Out Page", () => {
//     beforeEach(() => {
//         cy.visit('/')
//     })
//     it("should display logged out page if no one is logged in", () => {
//         cy.get('#loggedOutPage').should('be.visible')
//     })
//     it("should display log in page when 'Log in' link is clicked", () => {
//         cy.get('.loginLink').click()
//         cy.url().should('include', '/login')
//     })
//     it("should go back to main logged out page when app name in navbar is clicked", () => {
//         cy.get('#navbarLogo').click()
//         cy.get('#loggedOutPage').should('be.visible')
//     })
//     it("should display signup page when 'Sign Up' link is clicked", () => {
//         cy.get('.signupLink').click()
//         cy.url().should('include', '/signup')
//     })
// })

describe("Log in as a Developer", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  // it("should display logged out page if no one is logged in", () => {
  //     cy.get('#loggedOutPage').should('be.visible')
  // })
  // it("should display log in page when 'Log in' link is clicked", () => {
  //     cy.get('.loginLink').click()
  //     cy.url().should('include', '/login')
  // })
  // it("should display Developer Dashboard after successful log in", () => {
  //     cy.get('#developerDashboard').should('be.visible')
  // })
  it("should show Gantt Chart component", () => {
    cy.get(".gantt-container").should("be.visible");
  });
  it("should show Team Roster component", () => {
    cy.get("#teamRoster").should("be.visible");
  });
  it("should show Project Requirements component", () => {
    cy.get("#projectRequirements").should("be.visible");
  });
  // it("should log user out when log out button is clicked", () => {
  //     cy.get('.logoutLink').click()
  //     cy.get('#loggedOutPage').should('be.visible')
  // })
});

// describe("Log in as a Project Manager", () => {
//     beforeEach(() => {
//         cy.visit('/')
//     })
// it("should display logged out page if no one is logged in", () => {
//     cy.get('#loggedOutPage').should('be.visible')
// })
// it("should display log in page when 'Log in' link is clicked", () => {
//     cy.get('.loginLink').click()
//     cy.url().should('include', '/login')
// })
// it("should display Developer Dashboard after successful log in", () => {
//     cy.get('#developerDashboard').should('be.visible')
// })
// it("should show Gantt Chart component", () => {
//     cy.get('.gantt-container').should('be.visible')
// })
// it("should show Team Roster component", () => {
//     cy.get('#teamRoster').should('be.visible')
// })
// it("should show Project Requirements component", () => {
//     cy.get('#projectRequirements').should('be.visible')
// })
// it("should log user out when log out button is clicked", () => {
//     cy.get('.logoutLink').click()
//     cy.get('#loggedOutPage').should('be.visible')
// })
// })
