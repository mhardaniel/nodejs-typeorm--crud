describe('Navigation', () => {
  it('should navigate to the create page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#asdf').click();

    cy.url().should('include', '/create');

    cy.get('h1').contains('Create New Product');
  });
});
