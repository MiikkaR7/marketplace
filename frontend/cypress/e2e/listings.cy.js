describe('The cities page', () => {
  it('should show some cities', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'All Marketplace listings')
  })


it('should open the Login view when clicking Authenticate', () => {
  cy.visit('/')
  cy.contains('AUTHENTICATE').click()
  cy.url().should('include', 'auth')
  cy.contains('Sign up instead?').click()
  cy.get('button').should('not.contain', 'Sign up instead?')
  cy.contains('Log in instead?').click()
  cy.get('button').should('not.contain', 'Log in instead?')
})

it('should sign up a user with valid credentials', () => {
  cy.visit('/auth')
  //Toggle to signup mode
  cy.contains('Sign up instead?').click()
  cy.get('button').should('not.contain', 'Sign up instead?')
  cy.get('#name').type("Cypress User")
  cy.get('#email').type('cypress@test.com')
  cy.get('#password').type('password123')
  cy.get('#formbutton').click()
})

it('should log in and log out user', () => {
  cy.visit('/')
  cy.contains('AUTHENTICATE').click()
  cy.get('#email').type('cypress@test.com')
  cy.get('#password').type('password123')
  cy.get('#formbutton').click()
  cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)

  cy.contains('LOGOUT').click()
})
})


describe('Add listing', () => {
  it('should only be for logged in users', () => {
  cy.login('cypress@test.com', 'password123')
  cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
  cy.contains('LIST AN ITEM').click()
  cy.get('#name').type('Cypress listing')
  cy.get('#price').type(25.99)
  cy.get('#description').type('Listing for cypress tests')
  cy.get('#image').type('https://shop-static.arborday.org/media/0003686_pond-cypress.jpeg')
  cy.get('#add-listing').click()
  cy.visit('/')
  cy.contains('Cypress listing')
  })
})