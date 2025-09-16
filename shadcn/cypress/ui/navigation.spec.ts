describe('Navigation', () => {
  it('should navigate to the home page', () => {
    cy.visit('/');

    cy.get('a[href="/"]')
      .should('be.visible')
      .contains('Product Store')
      .within(() => {
        cy.get('svg').should('be.visible');
      });

    cy.get('a[href="/"]').click();

    cy.url().should('include', '/');

    cy.get('h1').contains('Current Products');
  });

  it('should navigate to the create page', () => {
    cy.visit('/');

    cy.get('#navCreateLink')
      .should('be.visible')
      .within(() => {
        cy.get('svg #Square_Plus').should('be.visible');
      });

    cy.get('#navCreateLink').click();

    cy.url().should('include', '/create');

    cy.get('h1').contains('Create New Product');
  });
});
