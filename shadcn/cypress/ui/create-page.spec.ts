import { faker } from '@faker-js/faker';

const requestBody = {
  name: faker.food.vegetable(),
  price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
  image:
    'https://unsplash.com/photos/a-red-and-blue-abstract-painting-of-a-person-GTvCovF_xmo',
};

describe('Create Form', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('should allow a user to type in the name, price and image', () => {
    const { name, price, image } = requestBody;
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="price"]')
      .type(price.toString())
      .should('have.prop', 'valueAsNumber', price);
    cy.get('input[name="image"]').type(image);
  });

  it('should show an error message for invalid input', () => {
    cy.get('button[type="button"]').click();

    cy.get('[data-sonner-toaster]')
      .should('be.visible')
      .and('contain.text', 'Please fill in all fields.');
  });

  it('should redirect to / on successful create', () => {
    const { name, price, image } = requestBody;
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="price"]')
      .type(price.toString())
      .should('have.prop', 'valueAsNumber', price);
    cy.get('input[name="image"]').type(image);

    cy.get('button[type="button"]').click();
    cy.url().should('include', '/');
    cy.get('[data-sonner-toaster]')
      .should('be.visible')
      .and('contain.text', 'Product created successfully.');
  });
});

describe('API Create Mocking', () => {
  const { name, price, image } = requestBody;

  beforeEach(() => {
    cy.intercept('POST', '/api/products', {
      statusCode: 201,
      body: { data: requestBody },
    }).as('createRequest');
    cy.visit('/create');
  });

  it('should mock a successful create', () => {
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="price"]').type(price.toString());
    cy.get('input[name="image"]').type(image);

    cy.get('button[type="button"]').click();

    cy.wait('@createRequest').its('response.statusCode').should('eq', 201);
    cy.url().should('include', '/');
    cy.get('[data-sonner-toaster]')
      .should('be.visible')
      .and('contain.text', 'Product created successfully.');
  });
});
