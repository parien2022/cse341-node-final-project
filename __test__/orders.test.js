const request = require('supertest')
const app = require('../app')

describe('GET /orders', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/orders').send()
    expect(response.statusCode).toBe(200)
  })
})
