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
    pool.query('DELETE FROM users WHERE email=?', ['john.wayne@domain.com']);

    const data = {
        name: 'John Wayne',
        email: 'john.wayne@domain.com',
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