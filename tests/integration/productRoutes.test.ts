import request from 'supertest';
import { Express } from 'express';

import { AppDataSource } from '../../src/data-source.js';
import createApp from '../../src/app.js';
import { Product } from '../../src/entity/Product.js';
import { ProductRepository } from '../../src/repositories/ProductRepository.js';

describe('Product API', () => {
  let app: Express;
  let productId: number;
  const productNotExistResponseError = {
    success: false,
    message: 'this product not exist',
  };
  const missingRequiredInputValidationError = {
    success: false,
    message: 'Please provide all fields',
  };

  beforeAll(async () => {
    await AppDataSource.initialize(); // Initialize TypeORM connection
    app = await createApp();
  });

  afterAll(async () => {
    await AppDataSource.destroy(); // Close TypeORM connection
  });

  describe('get all products', () => {
    it('should return 200 and all products', async () => {
      const response = await request(app).get('/api/products');

      const expectedResponse = {
        success: true,
        data: response.body.data,
      };

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('create product', () => {
    const requestBody = {
      name: 'product testing',
      price: 199,
      image:
        'https://images.unsplash.com/photo-1757151380289-a7e0a1f2a39d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
    };

    it('should return 400 if any of the request body is missing', async () => {
      const { name, price } = requestBody;

      const response = await request(app)
        .post('/api/products')
        .set('content-type', 'application/json')
        .send({ name, price });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(missingRequiredInputValidationError);
    });

    it('should return 201 and the product created', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('content-type', 'application/json')
        .send(requestBody);

      const responseBody = response.body;

      const expectedResponse = {
        success: true,
        data: responseBody.data,
      };

      productId = responseBody.data.id;

      expect(response.status).toBe(201);
      expect(responseBody).toEqual(expectedResponse);
    });
  });

  describe('get a product', () => {
    it('should return 404 if product not exist', async () => {
      const response = await request(app).get('/api/products/1111');

      expect(response.status).toBe(404);
      expect(response.body).toEqual(productNotExistResponseError);
    });

    it('should return 200 and a single product', async () => {
      const response = await request(app).get(`/api/products/${productId}`);

      const expectedResponse = {
        success: true,
        data: response.body.data,
      };

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('update product', () => {
    const requestBody = {
      name: 'product updating',
      price: 199,
      image:
        'https://images.unsplash.com/photo-1757151380289-a7e0a1f2a39d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
    };

    it('should return 400 if any of the request body is missing', async () => {
      const { name, price } = requestBody;

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('content-type', 'application/json')
        .send({ name, price });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(missingRequiredInputValidationError);
    });

    it('should return 404 if product not exist', async () => {
      const response = await request(app)
        .put('/api/products/1111')
        .set('content-type', 'application/json')
        .send({ ...requestBody, name: 'updated' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual(productNotExistResponseError);
    });

    it('should return 200 and the updated product', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('content-type', 'application/json')
        .send({ ...requestBody, name: 'updated' });

      const expectedResponse = {
        success: true,
        data: response.body.data,
      };

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('delete a product', () => {
    it('should return 404 if product not exist', async () => {
      const response = await request(app).delete('/api/products/1111');

      expect(response.status).toBe(404);
      expect(response.body).toEqual(productNotExistResponseError);
    });

    it('should return 200 and the success response object', async () => {
      const response = await request(app).delete(`/api/products/${productId}`);

      const expectedResponse = {
        success: true,
        message: 'product has been removed',
      };

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
