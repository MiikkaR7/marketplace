const pool = require('../db/pool');
const { describe, expect, test, afterAll, beforeAll } = require('@jest/globals');
const request = require('supertest');
const supertest = require('supertest');

const app = require('../app');

  afterAll(async () => {
    pool.query('DELETE FROM users WHERE email=?', ['testuser@test.com']);   
});

describe('POST users endpoint', () => {
  test('should create user and return 201', async () => {

    const testUser = {
      name: 'Testi',
      email: 'testuser@test.com',
      password: 'passwordtest'
    }

    const response = await request(app)
    .post('/api/users/signup')
    .set('Accept','application/json')
    .set('Content','application/json')
    .send(testUser)

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.email).toEqual('testuser@test.com');
  });

  
  test('should not create duplicate user and return 422', async () => {

    const testUser = {
      name: 'Testi',
      email: 'testuser@test.com',
      password: 'passwordtest'
    }

    const response = await request(app)
    .post('/api/users/signup')
    .set('Accept','application/json')
    .set('Content','application/json')
    .send(testUser)

    expect(response.status).toEqual(422);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('should not create user with missing/incorrect fields and return 400', async () => {

    const testUser = {
      email: 'testuser2@test.com',
      password: 'passwordtest'
    }

    const response = await request(app)
    .post('/api/users/signup')
    .set('Accept','application/json')
    .set('Content','application/json')
    .send(testUser)

    expect(response.status).toEqual(400);
  });

  test('should log in user with correct credentials and return 201', async () => {

    const testUser = {
      email: 'testuser@test.com',
      password: 'passwordtest'
    }

    const response = await request(app)
    .post('/api/users/login')
    .set('Accept','application/json')
    .set('Content','application/json')
    .send(testUser)

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('should not log in user with incorrect/missing credentials and return 401', async () => {

    const testUser = {
      email: 'doesntexist@test.com',
      password: 'passwordtest'
    }

    const response = await request(app)
    .post('/api/users/login')
    .set('Accept','application/json')
    .set('Content','application/json')
    .send(testUser)

    expect(response.status).toEqual(401);
  });

});