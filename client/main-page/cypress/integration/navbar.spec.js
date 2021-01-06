describe("Navbar", () => {
  beforeEach(() => {
      cy.visit('/')
  })
  
  it("should contain our app name", () => {
    cy.get('nav').should('contain', 'Project Management App')
  })
})