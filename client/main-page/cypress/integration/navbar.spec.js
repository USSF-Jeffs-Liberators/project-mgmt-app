describe("Navbar", () => {
  beforeEach(() => {
      cy.visit('/')
  })
  it("should contain our app name", () => {
    cy.get('nav').should('contain', 'Project Management App')
  })
  it("should contain Log In and Sign Up buttons when no one is logged in", () => {
    cy.get('nav>rux-button-group').children().should('have.length', 2)
  })
})