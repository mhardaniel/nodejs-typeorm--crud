import { faker } from '@faker-js/faker';

const apiProducts = `${Cypress.env('apiUrl')}/products`;

let productId: number;
const requestBody = {
  name: faker.food.vegetable(),
  price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
  image:
    'https://unsplash.com/photos/a-red-and-blue-abstract-painting-of-a-person-GTvCovF_xmo',
};

const productNotExistResponseError = {
  success: false,
  message: 'this product not exist',
};
const missingRequiredInputValidationError = {
  success: false,
  message: 'Please provide all fields',
};

describe('Product API', function () {
  context('POST /products', function () {
    const { name } = requestBody;
    it('should return 400 if any of the request body is missing', function () {
      cy.request({
        method: 'POST',
        url: `${apiProducts}`,
        body: {
          name,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.eq(missingRequiredInputValidationError);
      });
    });

    it('creates a new product', function () {
      cy.request('POST', `${apiProducts}`, requestBody).then((response) => {
        productId = response.body.data.id;
        expect(response.status).to.eq(201);
        expect(response.body.data).to.contain({ name });
      });
    });
  });

  context('GET /products', function () {
    it('gets a list of products', function () {
      cy.request('GET', apiProducts).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).length.to.be.greaterThan(1);
      });
    });
  });

  context('GET /products/:productId', function () {
    it('gets a product', function () {
      cy.request('GET', `${apiProducts}/${productId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('name');
      });
    });

    it('errors when invalid productId', function () {
      cy.request({
        method: 'GET',
        url: `${apiProducts}/1234`,
        failOnStatusCode: false,
      }).then((response) => {
        // cy.task('log', response.body);
        expect(response.status).to.eq(404);
        expect(response.body).to.deep.eq(productNotExistResponseError);
      });
    });
  });

  context('updates a product', function () {
    it('should return 400 if any of the request body is missing', function () {
      cy.request({
        method: 'PUT',
        url: `${apiProducts}/${productId}`,
        body: {
          name: 'update name',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.eq(missingRequiredInputValidationError);
      });
    });

    it('should return 404 if product not exist', function () {
      cy.request({
        method: 'PUT',
        url: `${apiProducts}/1234`,
        body: { ...requestBody, name: 'updated' },
        failOnStatusCode: false,
      }).then((response) => {
        // cy.task('log', response.body);
        expect(response.status).to.eq(404);
        expect(response.body).to.deep.eq(productNotExistResponseError);
      });
    });

    it('should return 200 and the updated product', function () {
      cy.request('PUT', `${apiProducts}/${productId}`, {
        ...requestBody,
        name: 'updated name',
      }).then((response) => {
        const expectedResponse = {
          success: true,
          data: response.body.data,
        };

        expect(response.status).to.eq(200);
        expect(response.body).to.deep.eq(expectedResponse);
      });
    });
  });

  context('deletes a product', function () {
    it('should return 404 if product not exist', function () {
      cy.request({
        method: 'DELETE',
        url: `${apiProducts}/1234`,
        failOnStatusCode: false,
      }).then((response) => {
        // cy.task('log', response.body);
        expect(response.status).to.eq(404);
        expect(response.body).to.deep.eq(productNotExistResponseError);
      });
    });

    it('should return 200 and the success response object', function () {
      cy.request('DELETE', `${apiProducts}/${productId}`).then((response) => {
        const expectedResponse = {
          success: true,
          message: 'product has been removed',
        };

        expect(response.status).to.eq(200);
        expect(response.body).to.deep.eq(expectedResponse);
      });
    });
  });
});
