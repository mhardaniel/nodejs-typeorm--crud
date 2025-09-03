import { AppDataSource } from '../../src/data-source.js';

describe('Product API', () => {
  beforeAll(async () => {
    await AppDataSource.initialize(); // Initialize TypeORM connection
  });

  afterAll(async () => {
    await AppDataSource.destroy(); // Close TypeORM connection
  });

  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});
