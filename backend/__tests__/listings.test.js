const pool = require('../db/pool');
const { describe, expect, test, afterAll, beforeAll } = require('@jest/globals');
const request = require('supertest');
const supertest = require('supertest');

const app = require('../app');

const loggedInUser = {
    userId: '',
    email: '',
    token: ''
  };

  beforeAll(async () => {
    pool.query('DELETE FROM users WHERE email=?', ['testuser@domain.com']);

    const data = {
        name: 'Test',
        email: 'testuser@domain.com',
        password: 'password123'
      }
    
      const response = await supertest(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .send(data)
      loggedInUser.userId = response.body.userId
      loggedInUser.email = response.body.email
      loggedInUser.token = response.body.token

});

describe('GET listings items endpoint', () => {
    test('should return 200', (done) => {
        request(app)
        .get('/api/listings')
        .expect(200)
        .end(done);
    });

    
test('should return 200 and valid JSON', async () => {
    const response = await request(app)
        .get('/api/listings')
        .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            id: 1,
            name: 'Muumimuki',
            price: 30.99,
            description: 'Harvinainen kerailyesine',
            image: 'https://finmug.fi/cdn/shop/files/Muumimukipiisamirottaluolassa1.webp?v=1707208560',
            owner: 'ADMIN'
        }),
      ]),
    );
  });

});

describe('POST listings endpoint', () => {
    test('should create new listing', async () => {
        const listing = {
            name: 'Mariskooli',
            price: 60.99,
            description: 'Punainen mariskooli',
            image: 'https://images.stockmann.com/products/a002149684516129274055d229837ab49685e0be/550x734/112356910_1.jpg',
            owner: 'ADMIN-0000-0000-0000-000000000000000'
        };

        const response = await request(app)
        .post('/api/listings')
        .set('Authorization', 'Bearer ' + loggedInUser.token)
        .set('Accept','application/json')
        .set('Content','application/json')
        .send(listing);

        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.id).toBeTruthy();
        expect(response.body.name).toEqual('Mariskooli');
        expect(response.body.price).toEqual(60.99);
        expect(response.body.description).toEqual('Punainen mariskooli');
        expect(response.body.image).toEqual('https://images.stockmann.com/products/a002149684516129274055d229837ab49685e0be/550x734/112356910_1.jpg');
        expect(response.body.owner).toEqual('ADMIN');
    });

});

// End and close the pool 
afterAll(async() => {
    const result = await pool.end();
    });