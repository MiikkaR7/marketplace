describe('The cities page', () => {
  it('should show some cities', () => {
    cy.visit('http://localhost:5172')
    cy.get('h1').should('contain', 'All Marketplace listings')
  })
})