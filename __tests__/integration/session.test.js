const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credencials', async () => {
    const user = await User.create({ 
      name: 'Julio', 
      email: 'julio.andrade321@gmail.com', 
      password: '123123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200);
  });
})

